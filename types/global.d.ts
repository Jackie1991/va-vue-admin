/**
 * 工具类型
 * 删除对象中的某些属性
 */
type RemoveProps<T, K extends keyof T> = Omit<T, K>

/**
 * 工具类型
 * 将类型 T 的所有键转换为字符串字面量联合类型
 */
type KeysOf<T> = T extends any ? keyof T : never

/**
 * 工具类型
 * 合并工具：合并相同属性为联合类型
 */
type MergeUnion<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] | U[K] // 将相同属性的类型合并为联合类型
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never
}

/**
 * 工具类型
 * 合并多个接口，相同属性的类型合并为联合类型
 */
type MergeAllUnions<T extends object[]> = T extends [infer Head, ...infer Tail]
  ? MergeUnion<Head, MergeAllUnions<Tail>>
  : unknown

/**
 * 定义一个响应数据类型
 */
type ResponseData<T> = {
  code: number
  message: string
  data: T
}

/**
 * 定义一个响应数据类型
 */
type AnyFunction = (...args: any[]) => any

/**
 * 定义一个用户信息类型
 */
type UserInfoInstance = {
  username: string
  usercode: string
  avatar: string
}
