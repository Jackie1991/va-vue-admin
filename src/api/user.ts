import request from '@/utils/request'

/**
 * @description 登录接口
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export type LoginInfo = {
  username: string
  password: string
}
export const login = (loginInfo: { username: string; password: string }) => {
  return request.post('/api/login', loginInfo)
}

/**
 * @description 登录接口
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export const getUserInfo = () => {
  return request.get('/api/getUserInfo')
}

/**
 * @description 登出接口
 */
export const logout = () => {
  return request.post('/api/logout')
}
