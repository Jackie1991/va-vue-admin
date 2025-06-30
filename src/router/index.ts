import type { App } from 'vue'
import { createRouter, createWebHashHistory, type RouteRecordRaw, type RouteRecordName } from 'vue-router'
import { setupPermissions } from './permissions'
import Layout from '@/layout/index.vue'

// 是否远程路由
const HAS_REMOTE_ROUTES = true
// 无权限路由白名单
export const routesWhiteList = ['/login', '/register', '/web', '/404', '/403']

// 默认全局路由。不论远程路由还是本地路由均需要配置
const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403.vue'),
    meta: {
      title: '403',
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'NotFound',
    meta: {
      title: '404',
      hidden: true,
    },
  },
]

// 首页独立路由
export const homeRoutes: VaRouteRecord = {
  path: '/',
  name: 'Root',
  component: Layout,
  meta: {
    title: '首页',
    levelHidden: true,
    noClosable: true,
  },
  children: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/index/index.vue'),
      meta: {
        title: '首页',
        levelHidden: true,
        noClosable: true,
      },
    },
  ],
}

// 路由列表
export const asyncRoutes: VaRouteRecord[] = [
  {
    path: '/web',
    name: 'Web',
    component: () => import('@/views/web/index.vue'),
    meta: {
      title: '门户',
      target: '_blank',
    },
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Layout,
    meta: {
      title: 'DEMO',
    },
    children: [
      {
        path: '/demo',
        name: 'DemoHome',
        component: () => import('@/views/demo/index.vue'),
        meta: {
          title: 'DEMO',
        },
      },
      {
        path: '/Detail',
        name: 'Detail',
        component: () => import('@/views/demo/detail.vue'),
        meta: {
          title: '表单',
        },
      },
    ],
  },
]

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes as RouteRecordRaw[],
})

// 添加路由
const addRouter = (routes: VaRouteRecord[]) => {
  routes.forEach((route: VaRouteRecord) => {
    if (!router.hasRoute(route.name)) router.addRoute(route as unknown as RouteRecordRaw)
    if (route.children) addRouter(route.children)
  })
}

// 重置路由
export const resetRouter = (routes: VaRouteRecord[]) => {
  routes.forEach((route: VaRouteRecord) => {
    const routeName: RouteRecordName = route.name
    if (router.hasRoute(routeName)) router.removeRoute(routeName)
  })
  addRouter(routes)
}

// 确保 router 创建后被调用
export const setupRouter = (app: App<Element>) => {
  setupPermissions(router, HAS_REMOTE_ROUTES)
  app.use(router)
}

// 确保 router 实例被正确导出
export default router
