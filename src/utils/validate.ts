/**
 * @description 判读是否为外链
 * @param value
 * @returns {boolean}
 */
export const isExternal = (value: string) => {
  return /^(https?:|mailto:|tel:|\/\/)/.test(value)
}

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
  const reg = /^1[3-9]\d{9}$/
  return reg.test(mobile)
}

/**
 * @description: 判断富文本是否包含文本或图片
 * @param {string} html 富文本
 * @returns {Boolean}
 */
export const validateRichTextContent = (html: string) => {
  if (!html) return false
  // 1. 判断是否有图片
  const hasImg = /<img\b[^>]*>/i.test(html)

  // 2. 判断是否有真实文本（去除标签、空格、换行、&nbsp;）
  const text = html
    .replace(/<[^>]+>/g, '') // 移除所有 HTML 标签
    .replace(/&nbsp;/gi, '') // 移除空格符号
    .replace(/\s+/g, '') // 移除空白/换行

  const hasText = text.trim().length > 0

  // 有图片 或 有文字 → 都算有内容
  return hasImg || hasText
}
