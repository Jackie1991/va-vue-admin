// 选中值的类型
export type ModelValueType = string | number | boolean | undefined

// 选项子项的类型
export type OptionObject = { label: string; value: string | number }
export type OptionType = string | number | OptionObject

export type RadioPropsType = {
  options: OptionType[]
  disabled?: boolean
  size?: 'small' | 'default' | 'large'
}

// radio 组件内使用的props类型
export type RadioProps = {
  modelValue: ModelValueType
} & RadioPropsType

// radio 事件类型
export interface RadioEmits {
  (e: 'update:modelValue', values: ModelValueType): void
  (e: 'change', value: ModelValueType): void
}
