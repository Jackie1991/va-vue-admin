import { getAccessToken, setAccessToken, clearToken } from '@/utils/auth'
import { login, type LoginInfo, getUserInfo, logout } from '@/api/user'
import { each, keys } from 'lodash-es'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive<UserInfoInstance>({
    username: '佚名',
    usercode: '',
    avatar: '',
  })
  const token = ref<string>(getAccessToken() || '')

  // 设置 token
  const setToken = (val: string) => {
    token.value = val
    setAccessToken(val)
  }

  // 重置所有
  const resetAll = async () => {
    setToken('')
    clearToken()
  }

  return {
    token,
    userInfo,
    // 登录
    login: async (info: LoginInfo) => {
      const { data } = await login(info)
      setToken(data.token)
    },
    // 获取用户信息
    getUserInfo: async () => {
      const { data } = await getUserInfo()
      each(keys(userInfo), (key: string) => {
        userInfo[key] = data[key]
      })
    },
    // 登出
    logout: async () => {
      await logout()
      await resetAll()
    },
    resetAll,
  }
})
