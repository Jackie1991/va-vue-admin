import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

// 语言类型
type LanguageType = 'zh-CN' | 'en'

export const useSettingStore = defineStore('setting', () => {
  const language = ref<LanguageType>('zh-CN')
  // 当前语言
  const locale = computed(() => (language.value === 'zh-CN' ? zhCn : en))
  // 项目title
  const title = 'Va Admin'

  // 切换语言
  const toggleLanguage = () => {
    language.value = language.value === 'zh-CN' ? 'en' : 'zh-CN'
  }

  return { locale, title, toggleLanguage }
})
