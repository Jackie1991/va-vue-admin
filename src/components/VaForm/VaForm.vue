<template>
  <el-form ref="formRef" class="va-form" :model="form" v-bind="restProps">
    <template v-for="field in fieldList" :key="field.prop">
      <va-form-item v-model="form[field.prop]" v-bind="field" />
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { omit } from 'lodash-es'
import type { FormInstance, FormProps as ElFormProps } from 'element-plus'
import VaFormItem, { type FormItemProps } from './VaFormItem.vue'

// 对外暴露可配置的属性 model
type FormPropsWithoutModel = Partial<Omit<ElFormProps, 'model'>>
interface FormProps extends FormPropsWithoutModel {
  modelValue: Record<string, any>
  fields: FormItemProps[]
}
const props = defineProps<FormProps>()
// 创建表单事件
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// 创建表单实例
const formRef = ref<FormInstance | undefined>()
// 获取排除指定属性后的传入属性
const restProps = omit(props, ['modelValue', 'fields'])
// 创建表单数据
const form = useVModel(props, 'modelValue', emits)
// 筛选需要渲染的表单列表
const fieldList = computed<FormItemProps[]>(() => props.fields.filter((item) => !item.hidden))
</script>
