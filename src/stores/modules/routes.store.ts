import { homeRoutes, asyncRoutes, resetRouter } from '@/router'
import { getList } from '@/api/routes'

/**
 * @description 渲染后端返回路由,支持包含views路径的所有页面
 * @param routes
 * @returns {*}
 */
const convertRouter = (routes: VaRouteRecord[]) => {
  const viewsComMap = import.meta.glob([
    '/src/views/**/*.vue',
    '!/src/views/**/components/**', // 排除views目录下页面内的components目录下的文件
    '!/src/views/{index,login,error}/**', // 排除views目录下的index,login,error目录
  ])
  return routes.map((route: VaRouteRecord) => {
    const index = route.component.indexOf('views')
    const path = index > 0 ? route.component.slice(index) : `${route.component}`
    route.component = viewsComMap[`/src/${path}`]

    if (route.children) {
      if (route.children.length > 0) route.children = convertRouter(route.children)
      else delete route.children
    }
    return route
  })
}

const filterHidden = (routes: VaRouteRecord[]) => {
  return routes.reduce((acc: any, item: any) => {
    if (item.meta && item.meta.hidden) return acc
    const newItem = { ...item }
    if (item.children && item.children.length > 0) newItem.children = filterHidden(item.children)
    return [...acc, newItem]
  }, [])
}

export const useRoutesStore = defineStore('routes', () => {
  // 菜单需要的路由
  const routes = ref<VaRouteRecord[]>([])
  // 所有的路由
  const allRoutes = ref<VaRouteRecord[]>([])

  // 设置路由
  const setRoutes = async (hasRemote: boolean) => {
    let newRoutes = [...asyncRoutes]
    // 获取远程路由
    if (hasRemote) {
      const { data } = await getList()
      if (!Array.isArray(data)) return $baseMessage('接口返回路由格式有误', 'error')
      newRoutes = convertRouter(data)
    }
    // 首页路由添加到路由表
    const accessRoutes: VaRouteRecord[] = [homeRoutes, ...newRoutes]
    // 设置菜单所需路由
    routes.value = filterHidden(accessRoutes)
    allRoutes.value = accessRoutes
    await resetRouter(accessRoutes)
  }

  return { routes, allRoutes, setRoutes }
})
