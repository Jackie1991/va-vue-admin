// 访问 token 缓存的 key
const ACCESS_TOKEN_KEY = 'access_token'
// 刷新 token 缓存的 key
const REFRESH_TOKEN_KEY = 'refresh_token'

export const getAccessToken = (): string => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || ''
}

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const getRefreshToken = (): string => {
  return localStorage.getItem(REFRESH_TOKEN_KEY) || ''
}

export const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

export const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}
