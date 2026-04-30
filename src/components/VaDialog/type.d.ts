// 表格配置
export interface DialogProps {
  modelValue: boolean // 是否显示
  title?: string // 标题
  className?: string // 自定义class
  fullscreen?: boolean // 是否全屏
  appendToBody?: boolean // 是否插入到body
}

// 上传文件方法
export interface DialogEmits {
  (e: 'update:modelValue', values: boolean): void
  (e: 'close'): void
}
