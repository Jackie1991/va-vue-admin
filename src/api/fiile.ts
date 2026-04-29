import request from '@/utils/request'

/**
 * @description 上传接口
 * @param {File} file 文件
 */
export const upload = (file: File) => {
  return request.post('/api/upload', file)
}
