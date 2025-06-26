import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'

/**
 * @description: 消息提示框
 * @param {*}
 */
export const $baseLoading = (text: string, background = 'rgba(0, 0, 0, 0.1)') => {
  return ElLoading.service({
    lock: true,
    text,
    background,
  })
}

/**
 * @description: 消息提示框
 * @param {*}
 */
export const $baseMessage = (
  message: string,
  type: 'success' | 'warning' | 'info' | 'error' = 'info',
  callback?: any,
) => {
  ElMessage({
    message,
    type,
    duration: 3000,
    showClose: false,
    grouping: true,
    plain: true,
    onClose: () => {
      if (callback) callback()
    },
  })
}

/**
 * @description: 消息确认框
 * @param {*}
 */
export const $baseConfirm = (config: {
  content: string
  title?: string
  callback?: any
  confirmButtonText?: string
  cancelButtonText?: string
}) => {
  ElMessageBox.confirm(config.content, config.title || '温馨提示', {
    confirmButtonText: config.confirmButtonText || '确定',
    cancelButtonText: config.cancelButtonText || '取消',
    closeOnClickModal: false,
    draggable: true,
    type: 'warning',
    lockScroll: false,
    showClose: false,
  }).then(() => {
    if (config.callback) {
      config.callback()
    }
  })
}
