import { homeRoutes } from '@/router'

const CAUGHT_ROUTES_NAME = 'caughtRoutes'
// 初始化tabs的列表
const initVisitedRoutes = () => {
  const routes = JSON.parse(localStorage.getItem(CAUGHT_ROUTES_NAME) as string) || []
  const index = routes.findIndex((route: VaRouteRecord) => route.path === '/')
  if (index > -1) {
    routes.splice(index, 1)
  }
  routes.unshift({ path: '/', name: 'Index', meta: { ...homeRoutes.meta } })
  return routes
}

export const useTabsStore = defineStore('tabs', () => {
  // 当前打开的标签路由
  const visitedRoutes = ref<VaRouteRecord[]>(initVisitedRoutes())

  return {
    visitedRoutes,
    // 添加已访问的标签路由
    addVisitedRoute: (route: any) => {
      if (route.meta.target === '_blank') return
      const index = visitedRoutes.value.findIndex((item) => item.path === route.path)
      if (index === -1) visitedRoutes.value.push(route)
    },
    // 删除标签
    removeVisitedRoute: (path: string) => {
      visitedRoutes.value = visitedRoutes.value.filter((item) => item.path !== path)
    },
  }
})
