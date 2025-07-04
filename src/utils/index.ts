/**
 * 随机数
 * @param {number} m
 * @param {number} n
 * @returns {number}
 */
export const random = (m: number, n: number) => {
  return Math.floor(Math.random() * (m - n) + n)
}
