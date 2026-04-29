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
    path: '/system',
    name: 'System',
    component: Layout,
    meta: {
      title: '系统管理',
    },
    children: [
      {
        path: '/system/MenuView',
        name: 'SystemMenu',
        component: () => import('@/views/system/MenuView.vue'),
        meta: {
          title: '菜单管理',
        },
      },
      {
        path: '/system/RoleView',
        name: 'SystemRole',
        component: () => import('@/views/system/RoleView.vue'),
        meta: {
          title: '角色管理',
        },
      },
      {
        path: '/system/UserView',
        name: 'SystemUser',
        component: () => import('@/views/system/UserView.vue'),
        meta: {
          title: '用户管理',
        },
      },
    ],
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Layout,
    meta: {
      title: '活动管理',
      levelHidden: true,
    },
    children: [
      {
        path: '/activity',
        name: 'ActivityHome',
        component: () => import('@/views/activity/index.vue'),
        meta: {
          title: '活动管理',
        },
      },
      {
        path: '/activity/detail',
        name: 'ActivityDetail',
        component: () => import('@/views/activity/detail.vue'),
        meta: {
          title: '活动详情',
          hidden: true,
        },
      },
    ],
  },
  {
    name: 'Specialist',
    path: '/specialist',
    component: Layout,
    meta: {
      title: '专家管理',
    },
    children: [
      {
        name: 'SpecialistHome',
        path: '/specialist',
        component: () => import('@/views/specialist/index.vue'),
        meta: {
          title: '专家列表',
        },
      },
      {
        path: '/specialist/ShiftSchedule',
        name: 'ShiftSchedule',
        component: () => import('@/views/specialist/ShiftSchedule.vue'),
        meta: {
          title: '日历排班表',
        },
      },
      {
        path: '/specialist/AppointmentSchedule',
        name: 'Appointment',
        component: () => import('@/views/specialist/AppointmentSchedule.vue'),
        meta: {
          title: '预约时间表',
        },
      },
    ],
  },
  {
    path: '/content',
    name: 'Content',
    component: Layout,
    meta: {
      title: '内容管理',
      levelHidden: true,
    },
    children: [
      {
        path: '/content',
        name: 'ContentCenter',
        component: () => import('@/views/content/index.vue'),
        meta: {
          title: '内容中心',
        },
      },
      {
        path: '/content/detail',
        name: 'ContentDetail',
        component: () => import('@/views/content/detail.vue'),
        meta: {
          title: '内容详情',
          hidden: true,
        },
      },
    ],
  },
  // {
  //   path: '/web',
  //   name: 'Web',
  //   component: () => import('@/views/web/index.vue'),
  //   meta: {
  //     title: '门户',
  //     target: '_blank',
  //   },
  // },
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
