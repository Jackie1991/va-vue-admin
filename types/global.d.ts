/**
 * 删除对象中的某些属性
 */
type RemoveProps<T, K extends keyof T> = Omit<T, K>

/**
 * 定义一个响应数据类型
 */
type ResponseData<T> = {
  code: number
  message: string
  data: T
}
