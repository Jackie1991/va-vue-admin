import { getAccessToken, setAccessToken, clearToken } from '@/utils/auth'
import { login as queryLogin, type LoginInfo, getUserInfo as queryUserInfo, logout as queryLogout } from '@/api/user'
import { each, keys } from 'lodash-es'

export const useUserStore = defineStore('user', () => {
  const userinfo = reactive<UserInfoInstance>({
    username: 'admin',
    usercode: 'admin',
    avatar: '',
  })
  const token = ref<string>(getAccessToken() || '')

  // 设置 token
  const setToken = (val: string) => {
    token.value = val
    setAccessToken(val)
  }

  // 登录
  const login = async (info: LoginInfo) => {
    const { data } = await queryLogin(info)
    setToken(data.token)
  }

  // 获取用户信息
  const getUserInfo = async () => {
    const { data } = await queryUserInfo()
    each(keys(userinfo), (key: string) => {
      userinfo[key] = data[key]
    })
  }

  // 登出
  const logout = async () => {
    await queryLogout()
    await resetAll()
  }

  // 重置所有
  const resetAll = async () => {
    setToken('')
    clearToken()
  }

  return { token, userinfo, login, getUserInfo, logout, resetAll }
})
