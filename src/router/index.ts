import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

// 默认路由
const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true,
    },
  },
]

// 路由配置
const pageRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/index/index.vue'),
  },
]

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...pageRoutes, ...constantRoutes],
})

// 确保 router 创建后被调用
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

// 确保 router 实例被正确导出
export default router
