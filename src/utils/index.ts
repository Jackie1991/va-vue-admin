/**
 * @name 获取静态资源的路径
 * @param {string} path 资源所在目录路径
 * @returns {string}
 */
export const getAssetsPath = (path: string) => {
  return new URL(`../assets/${path}?x-oss-process=image/format,webp`, import.meta.url).href
}

/**
 * @name 随机数
 * @param {number} m
 * @param {number} n
 * @returns {number}
 */
export const random = (m: number, n: number) => {
  return Math.floor(Math.random() * (m - n) + n)
}
