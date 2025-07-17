<template>
  <el-select
    v-model="selectValue"
    class="va-select"
    remote-show-suffix
    v-bind="propsAttr"
    @change="emits('change', $event)"
  >
    <el-option v-for="item in optionList" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script lang="ts" setup>
import { map, omit } from 'lodash-es'
import type { SelectProps, OptionObject, OptionType, SelectEmits } from './type'

// 组件的类型props和方法emit
const props = withDefaults(defineProps<SelectProps>(), {
  clearable: true,
  defaultFirstOption: true,
  noMatchText: '未匹配到数据',
  noDataText: '暂无数据',
  loadingText: '加载中...',
})
const emits = defineEmits<SelectEmits>()

// 组件选中的值
const selectValue = useVModel(props, 'modelValue', emits)
// 组件的配置属性
const propsAttr = computed<Omit<SelectProps, 'modelValue' | 'options'>>(() => omit(props, 'options'))
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

<style lang="scss" scoped></style>
