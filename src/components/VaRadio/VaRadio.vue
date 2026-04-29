<template>
  <el-radio-group v-model="radioValue" type="radio">
    <el-radio v-for="item in optionList" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { map } from 'lodash-es'
import type { OptionObject, OptionType, RadioProps, RadioEmits } from './type'

// 组件的类型props和方法emit
const props = withDefaults(defineProps<RadioProps>(), {})
const emits = defineEmits<RadioEmits>()

const radioValue = useVModel(props, 'modelValue', emits)

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
