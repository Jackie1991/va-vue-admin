// 表格配置
export interface UploadProps {
  modelValue: string[] // 文件列表
  action?: string // 必选参数，上传的地址
  headers?: Record<string, any> // 设置上传的请求头部
  multiple?: boolean // 是否支持多选文件
  data?: Record<string, any> // 上传时附带的额外参数
  name?: string // 上传的文件字段名
  showFileList?: boolean // 是否显示已上传文件列表
  drag?: boolean // 是否启用拖拽上传
  accept?: string // 接受上传的文件类型
  listType?: 'text' | 'picture' | 'picture-card' // 上传列表的内建样式，支持 text/picture/picture-card
  disabled?: boolean // 是否禁用
  limit?: number // 最大上传数量
  maxSize?: number // 文件大小限制，单位为MB
}

// 上传文件方法
export interface UploadEmits {
  (e: 'update:modelValue', values: ModelValueType): void
}
