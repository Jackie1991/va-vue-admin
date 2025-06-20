/**
 * @description: 获取请求接口地址
 */
const appBaseUrl = ((): string => {
  let host = import.meta.env.VITE_APP_API_URL
  if (!host) {
    host = window.location.origin
  }
  host += import.meta.env.VITE_APP_BASE_API
  return host
})()

export default appBaseUrl
