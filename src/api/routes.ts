import request from '@/utils/request'

/**
 * @description 获取远端路由接口
 */
export const getList = () => {
  return request.get('/api/routes')
}
