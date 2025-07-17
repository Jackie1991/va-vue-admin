import type { FormProps as ElFormProps, FormItemProps as ElFormItemProps } from 'element-plus'
import type { SelectPropsType } from '@/components/VaSelect/type'
import type { ChoosePropsType, ChooseType } from '@/components/VaChoose/type'

// 对外暴露可配置的属性 model
export type FormPropsWithoutModel = Partial<Omit<ElFormProps, 'model'>>

// 表单项内容属性类型
type BasicType = 'text' | 'textarea' | 'password' | 'tel' | 'number' | 'select'
export type FormItemType = BasicType | ChooseType

// 表单内容对应属性类型
type MergedProps = SelectPropsType & ChoosePropsType
export interface FormItemContentProps extends Partial<MergedProps> {
  placeholder?: string
}

// form item 自定义属性字段
export type FormItemKeys = 'prop' | 'label' | 'labelPosition' | 'labelWidth' | 'rules' | 'size' | 'required'
// form item 属性类型
export type FormItemProps = Omit<Partial<Pick<ElFormItemProps, FormItemKeys>>, 'prop'>

// 表单字段属性类型
export interface FieldProps extends FormItemProps, FormItemContentProps {
  prop: string // 必填 表单对应的字段名
  type: FormItemType // 必填 表单类型
  hidden?: boolean // 默认为 false
}

// 表单可用按钮类型
export type FormButtonType = 'submit' | 'reset' | 'cancel'

// form 表单属性类型
export interface FormProps extends FormPropsWithoutModel {
  modelValue: Record<string, any>
  fields: FieldProps[]
  buttons?: Join<FormButtonType, 3, ','> // 表单内部支持的按钮类型
  submitText?: string // 提交按钮文字
  hideButton?: boolean // 隐藏表单按钮
  throttleDelay?: number // 表单按钮点击间隔时间
}

// 表单事件类型
export interface FormEmits {
  (e: 'update:modelValue', values: Record<string, any>): void
  (e: 'submit', values: Record<string, any>): void
  (e: 'reset'): void
  (e: 'cancel'): void
}
