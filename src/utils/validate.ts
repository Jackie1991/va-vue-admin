/**
 * @description: 邮箱验证
 * @param {string} email 邮箱
 * @returns {Boolean}
 */
export const validateEmail = (email: string) => {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  return reg.test(email)
}

/**
 * @description: 手机号验证
 * @param {string} mobile 手机号
 * @returns {Boolean}
 */
export const validateMobile = (mobile: string) => {
  const reg = /^1[3-9]\d{8}$/
  return reg.test(mobile)
}
