// 选中值的类型
export type ModelValueType = (string | number)[]

// 选项子项的类型
export type OptionObject = { label: string; value: string | number }
export type OptionType = string | number | OptionObject

export type CheckboxPropsType = {
  options: OptionType[]
  disabled?: boolean
  size?: 'small' | 'default' | 'large'
}

// select 组件内使用的props类型
export type CheckboxProps = {
  modelValue: ModelValueType
} & CheckboxPropsType

// select 事件类型
export interface CheckboxEmits {
  (e: 'update:modelValue', values: ModelValueType): void
  (e: 'change', value: ModelValueType): void
}
