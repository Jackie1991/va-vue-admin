<template>
  <va-form
    v-model="form"
    class="va-inline-form"
    inline
    v-bind="restProps"
    @submit="emits('submit', $event)"
    @reset="emits('reset')"
  />
</template>

<script setup lang="ts">
import { omit } from 'lodash-es'
import type { FormProps, FormEmits } from '@/components/VaForm/type'

// 创建表单属性
const props = withDefaults(defineProps<Omit<FormProps, 'inline'>>(), {
  buttons: 'submit,reset',
  submitText: '查询',
})
// 创建表单事件
const emits = defineEmits<FormEmits>()
const form = useVModel(props, 'modelValue', emits)
const restProps = computed(() => omit(props, ['modelValue']))
</script>

<style lang="scss" scoped>
.va-inline-form {
  :deep() {
    .va-form-item {
      min-width: 221px;
    }

    .va-form-footer {
      vertical-align: top;

      .el-form-item__label-wrap {
        display: none;
      }
    }
  }
}
</style>
