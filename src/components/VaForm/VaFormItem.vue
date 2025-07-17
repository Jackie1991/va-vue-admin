<template>
  <el-form-item class="va-form-item" v-bind="propsAttrs.formItemAttrs">
    <!-- 表单插槽 将表单元素的props传入 -->
    <slot :name="prop" :config="propsAttrs.formItemContentAttrs">
      <template v-if="['text', 'textarea', 'password', 'tel', 'number'].includes(type)">
        <el-input v-model="itemValue" :show-password="type === 'password'" v-bind="propsAttrs.formItemContentAttrs" />
      </template>
      <template v-if="type === 'select'">
        <va-select v-model="itemValue" v-bind="{ options: [], ...propsAttrs.formItemContentAttrs }" />
      </template>
      <template v-if="['radio', 'checkbox'].includes(type)">
        <va-choose
          v-model="itemValue"
          v-bind="{ type: type as ChooseType, options: [], ...propsAttrs.formItemContentAttrs }"
        />
      </template>
    </slot>
  </el-form-item>
</template>

<script setup lang="ts">
import { keys } from 'lodash-es'
import type { FieldProps, FormItemProps, FormItemContentProps, FormItemKeys } from './type.d.ts'
import type { ChooseType } from '@/components/VaChoose/type'

// 内部使用的属性类型
interface Props extends FieldProps {
  modelValue: any
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// 获取 v-model 绑定的属性值
const itemValue = useVModel(props, 'modelValue', emits)
// 需要过滤的属性
const filterKeys = ['modelValue', 'type']
// form-item 的属性
const formItemKeys: FormItemKeys[] = ['prop', 'label', 'labelPosition', 'labelWidth', 'rules', 'size', 'required']
// 获取 va-form-item 的属性值
const propsAttrs = computed<{ formItemAttrs: FormItemProps; formItemContentAttrs: FormItemContentProps }>(() => {
  const params = { formItemAttrs: {}, formItemContentAttrs: {} }
  for (const key of keys(props)) {
    if (!props[key] || filterKeys.includes(key)) continue
    if (formItemKeys.includes(key as FormItemKeys)) {
      params.formItemAttrs[key] = props[key]
    } else {
      params.formItemContentAttrs[key] = props[key]
    }
  }
  return params
})
</script>
