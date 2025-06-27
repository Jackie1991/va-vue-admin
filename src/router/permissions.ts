import type { Router } from 'vue-router'
import { useSettingStore, useUserStore, useRoutesStore } from '@/stores'

// 路由白名单
const routesWhiteList = ['/login', '/register', '/password', '/404', '/403']

/**
 * @description 设置标题
 * @param pageTitle
 * @returns {string}
 */
const getPageTitle = (pageTitle: string) => {
  const settingStore = useSettingStore()
  const newTitle: string[] = []
  if (pageTitle) newTitle.push(pageTitle)
  if (settingStore.title) newTitle.push(settingStore.title)
  return newTitle.join(' - ')
}

/**
 * 获取当前跳转登录页的Route
 * @param currentPath 当前页面地址
 */
export const toLoginRoute = (currentPath: string) => {
  const loginParam: any = { path: '/login', replace: true }
  if (currentPath !== '/') loginParam.query = { redirect: currentPath }
  return loginParam
}

/**
 * @description 绑定路由拦截器
 * @param Router
 * @returns {Router}
 */
export const setupPermissions = (router: Router, hasRemote: boolean) => {
  // 路由拦截器
  router.beforeEach(async (to, from, next) => {
    const { routes, setRoutes } = useRoutesStore()
    const { token, getUserInfo, resetAll } = useUserStore()

    if (token) {
      if (routes.length > 0) {
        if (to.path === '/login') {
          next({ path: '/' })
        } else next()
      } else {
        try {
          // 获取用户信息
          await getUserInfo()
          // 根据是否开启远程路由设置路由
          await setRoutes(hasRemote)

          const path = to.redirectedFrom ? to.redirectedFrom.fullPath : to.fullPath
          next({ path, replace: true })
        } catch (error) {
          console.error('错误拦截:', error)
          await resetAll()
          next(toLoginRoute(to.fullPath))
        }
      }
    } else {
      if (routesWhiteList.includes(to.path)) {
        next()
      } else next(toLoginRoute(to.fullPath))
    }
  })

  // 路由后置拦截器
  router.afterEach((to) => {
    if (typeof to.meta.title === 'string') document.title = getPageTitle(to.meta.title)
  })

  router.onError((error: any) => {
    console.error('router 错误拦截:', error.message)
  })

  return router
}
