// 定义基础类型
type RadioType = 'radio'
type CheckboxType = 'checkbox'
type ChooseType = RadioType | CheckboxType

// 选中值的类型
type BaseValue = string | number
type RadioValue = BaseValue | undefined
type CheckboxValue = BaseValue[]

interface RadioConfig {
  type: RadioType
  modelValue: RadioValue
}

interface CheckboxConfig {
  type: CheckboxType
  modelValue: CheckboxValue
}

type ChooseConfig = RadioConfig | CheckboxConfig

// 选项子项的类型
export type OptionObject = { label: string; value: string | number }
export type OptionType = string | number | OptionObject

export type ChoosePropsType = {
  options: OptionType[]
}

// select 组件内使用的props类型
export type ChooseProps = ChooseConfig & ChoosePropsType
// export interface ChooseProps extends ChooseConfig, ChoosePropsType {}

// select 事件类型
export interface ChooseEmits {
  (e: 'update:modelValue', values: ChooseValueType): void
  (e: 'change', value: ChooseValueType): void
}
