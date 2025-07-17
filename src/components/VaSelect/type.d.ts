import type { SelectProps as ElSelectProps } from 'element-plus'

// 对外暴露的select属性
export type SelectPropsWithoutModel = Partial<Omit<ElSelectProps, 'modelValue' | 'autocomplete' | 'remoteShowSuffix'>>

// 选中值的类型
type SelectValueType = string | number | undefined

// 选项子项的类型
export type OptionObject = { label: string; value: string | number }
export type OptionType = string | number | OptionObject

export type SelectPropsType = SelectPropsWithoutModel & {
  options: OptionType[]
}

// select 组件内使用的props类型
export interface SelectProps extends SelectPropsType {
  modelValue: SelectValueType
}

// select 事件类型
export interface SelectEmits {
  (e: 'update:modelValue', values: SelectValueType): void
  (e: 'change', value: SelectValueType): void
}
