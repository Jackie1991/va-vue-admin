import type { App } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

export const setupStore = (app: App<Element>) => {
  app.use(pinia)
}

export * from './modules/setting.store'
export * from './modules/user.store'
export * from './modules/routes.store'
export * from './modules/tabs.store'

export default pinia
