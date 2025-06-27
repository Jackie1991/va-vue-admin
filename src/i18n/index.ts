import type { App } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'
import { useSettingStore } from '@/stores'
import en from './en.json'

const messages: Record<LanguageType, any> = {
  en: {
    ...en,
  },
  zh: {},
}

const getLanguage = () => {
  const settingStore = useSettingStore()
  return settingStore.language
}

export const i18n = createI18n({
  legacy: false,
  locale: getLanguage(),
  fallbackLocale: 'zh',
  messages,
})

export const setupI18n = (app: App<Element>) => {
  app.use(i18n)
  return i18n
}

export const translate = (text: string, params?: Record<string, any>) => {
  if (!text) return ''
  const { t } = useI18n()
  return t(text, params || {})
}

export { default as zhLocale } from 'element-plus/dist/locale/zh-cn.mjs'
export { default as enLocale } from 'element-plus/dist/locale/en.mjs'
