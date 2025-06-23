export const useUserStore = defineStore('user', () => {
  const username = ref<string>('')

  const resetAll = async () => {}

  return { username, resetAll }
})
