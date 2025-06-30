import { useI18n } from 'vue-i18n'

// 语言类型
export const useSettingStore = defineStore('setting', () => {
  // 项目title
  const title = 'Va Admin'
  // 当前语言
  const language = ref<LanguageType>('zh')
  // 侧边栏折叠状态
  const collapse = ref<boolean>(JSON.parse(localStorage.getItem('collapse') || 'false'))

  return {
    language,
    title,
    collapse,
    // 切换语言
    toggleLanguage: () => {
      const { locale } = useI18n()
      language.value = language.value === 'zh' ? 'en' : 'zh'
      locale.value = language.value
    },
    // 切换侧边栏折叠状态
    toggleCollapse: () => {
      collapse.value = !collapse.value
      localStorage.setItem('collapse', collapse.value.toString())
    },
    // 修改折叠状态
    updateCollapse: (state: boolean) => {
      collapse.value = state
      localStorage.setItem('collapse', collapse.value.toString())
    },
  }
})
