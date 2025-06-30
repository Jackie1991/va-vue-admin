import '@/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/stores'
import { setupI18n } from '@/i18n'

const app = createApp(App)

// 自定义插件功能引入
const Plugins = import.meta.glob('./plugins/*.ts', { eager: true })
Object.getOwnPropertyNames(Plugins).forEach((key) => {
  const plugin: any = Plugins[key]
  app.use(plugin.default)
})

setupStore(app)
setupRouter(app)
setupI18n(app)

app.mount('#app')
