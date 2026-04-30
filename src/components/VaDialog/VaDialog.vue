<template>
  <el-dialog
    :class="`va-dialog ${className}`"
    v-model="dialogVisible"
    destroy-on-close
    v-bind="propsAttr"
    @close="emits('close')"
  >
    <slot></slot>
  </el-dialog>
</template>

<script lang="ts" setup>
import { omit } from 'lodash-es'
import type { DialogProps, DialogEmits } from './type'

const excludeProp = ['modelValue', 'className'] as const
type ExcludeType = (typeof excludeProp)[number]

// 组件的类型props和方法emit
const props = withDefaults(defineProps<DialogProps>(), {
  className: '',
  fullscreen: false,
  appendToBody: true,
})
const propsAttr = computed<Omit<DialogProps, ExcludeType>>(() => omit(props, excludeProp))
const emits = defineEmits<DialogEmits>()

const dialogVisible = useVModel(props, 'modelValue', emits)
</script>
