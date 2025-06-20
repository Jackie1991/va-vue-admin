import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { toLower } from 'lodash-es'
import baseURL from '@/utils/baseUrl'
import { getAccessToken } from '@/utils/auth'
import { useUserStore } from '@/stores/user'

const router = useRouter()
// 成功请求code
const statusName = 'code'
// 返回消息字段
const messageName = 'msg'
// 成功状态
const successCode = [200, '200', 10000, '10000']
// loading对象
let loadingInstance: any

const CODE_MESSAGE: any = {
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队(异步任务)',
  204: '删除数据成功',
  400: '发出信息有误',
  401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
  402: '令牌过期',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  406: '请求格式不可得',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
}
/**
 * @description axios初始化
 */
const instance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 响应处理
const responseConfig = (response: AxiosResponse): Promise<any | any> => {
  const { data, status, statusText } = response
  const { resetAll } = useUserStore()
  if (loadingInstance) loadingInstance.close()

  // 处理响应状态码
  let code = data && data[statusName] !== undefined ? data[statusName] : status
  if (successCode.includes(data[statusName])) code = 200

  switch (code) {
    case 200: {
      return { code: 200, data: data.data, msg: '' } as any
    }
    case 401: {
      resetAll().then(() => {
        router.push({ path: '/login', replace: true })
      })
      break
    }
    case 403:
    case 404: {
      router.push({ path: `/${code}` })
      break
    }
  }
  // 若data.msg存在，覆盖默认提醒消息
  const errMsg = `${data && data[messageName] ? data[messageName] : CODE_MESSAGE[code] ? CODE_MESSAGE[code] : statusText}`
  // if (errMsg) $baseMessage(errMsg, 'error')
  console.log(errMsg)
  throw data
}

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken()
    // 如果 Authorization 设置为 no-auth，则不携带 Token
    if (config.headers.Authorization !== 'no-auth' && accessToken) {
      config.headers.Authorization = accessToken
    } else {
      delete config.headers.Authorization
    }

    // get请求 参数处理
    if (toLower(config.method) === 'get') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      config.params = config.data
      config.data = {}
    }

    // if (!loadingInstance) loadingInstance = $baseLoading('请稍等...')

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response: AxiosResponse): Promise<ResponseData<any> | any> => responseConfig(response),
  (error) => {
    console.error('request error', error)
    const { response } = error
    if (response === undefined) {
      if (loadingInstance) loadingInstance.close()
      return
    } else return responseConfig(response)
  },
)

export default instance
