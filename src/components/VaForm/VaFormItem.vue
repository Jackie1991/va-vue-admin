<template>
  <el-form-item class="va-form-item" v-bind="formItemAttrs">
    <el-input v-model="value" />
  </el-form-item>
</template>

<script setup lang="ts">
import { omit } from 'lodash-es'
import type { FormItemProps as ElFormItemProps } from 'element-plus'

// form-item 组件需要的属性类型
type FormItemType = Partial<ElFormItemProps>
// 对外暴露的属性类型
export interface FormItemProps extends FormItemType {
  prop: string // 必填 表单对应的字段名
  hidden?: boolean // 默认为 false
}

// 内部使用的属性类型
interface Props extends FormItemProps {
  modelValue: any
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = useVModel(props, 'modelValue', emits)

const formItemAttrs = omit(props, ['modelValue', 'hidden'])
</script>
