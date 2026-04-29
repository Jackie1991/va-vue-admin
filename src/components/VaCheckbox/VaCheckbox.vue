<template>
  <el-checkbox-group v-model="checkboxValue">
    <el-checkbox v-for="item in optionList" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts" setup>
import { map } from 'lodash-es'
import type { OptionObject, OptionType, CheckboxProps, CheckboxEmits } from './type'

// 组件的类型props和方法emit
const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: () => [],
})
const emits = defineEmits<CheckboxEmits>()

const checkboxValue = computed({
  get() {
    if (Array.isArray(props.modelValue)) return props.modelValue
    if (typeof props.modelValue === 'string' && !props.modelValue) return []
    return [props.modelValue]
  },
  set(val) {
    emits('update:modelValue', val)
  },
})

const optionList = computed<OptionObject[]>(() =>
  map(props.options, (item: OptionType) => {
    if (Object.prototype.toString.call(item) === '[object Object]') return item as OptionObject
    return {
      label: item,
      value: item,
    } as OptionObject
  }),
)
</script>
