// 表格配置
export interface EditorProps {
  modelValue: string // 编辑器内容
  height?: string // 编辑器高度
}

export interface EditorEmits {
  (e: 'update:modelValue', value: string): void
}
