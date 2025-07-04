<template>
  <el-form ref="formRef" class="va-form" :model="form" v-bind="restProps">
    <template v-for="field in fieldList" :key="field.prop">
      <va-form-item v-model="form[field.prop]" v-bind="field">
        <template v-if="$slots[field.prop]" #[field.prop]="slotProps">
          <slot :name="field.prop" v-bind="{ ...slotProps }"></slot>
        </template>
      </va-form-item>
    </template>
    <el-form-item v-if="!hideButton" class="va-form-footer" label="&nbsp;">
      <slot name="footer">
        <el-button
          v-for="button in buttonList"
          :key="button.code"
          v-bind="button"
          @click.stop="handleFormClick(formRef, button.code)"
        >
          {{ button.name }}
        </el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { map, omit, cloneDeep, throttle } from 'lodash-es'
import type { FormInstance } from 'element-plus'
import type { FormProps, FormButtonType, FieldProps, FormPropsWithoutModel, FormEmits } from './type.d.ts'

// 创建表单属性
const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: 'auto',
  scrollToError: true,
  showMessage: true,
  buttons: 'submit,reset',
  submitText: '提交',
  hideButton: false,
})
// 创建表单事件
const emits = defineEmits<FormEmits>()

// 创建表单实例
const formRef = ref<FormInstance | undefined>()
// 获取排除指定属性后的传入属性
const restProps = computed<FormPropsWithoutModel>(() => omit(props, ['modelValue', 'fields']))
// 创建表单数据
const form = useVModel(props, 'modelValue', emits)
// 初始化form组件时传入的数据
const defaultValue = ref<any>({})
// 筛选需要渲染的表单列表
const fieldList = computed<FieldProps[]>(() => props.fields.filter((item) => !item.hidden))
// 创建表单按钮列表
const buttonList = computed<{ code: FormButtonType; type: any; name: string }[]>(() => {
  const buttonName = {
    submit: props.submitText,
    reset: '重置',
    cancel: '取消',
  }
  return map(props.buttons.split(','), (button: FormButtonType) => ({
    type: button === 'submit' ? 'primary' : 'default',
    code: button,
    name: buttonName[button],
  }))
})

// 点击表单按钮
const handleFormClick = throttle(
  async (formEl: FormInstance | undefined, type: FormButtonType) => {
    if (!formEl) return
    // 提交表单
    if (type === 'submit') {
      await formEl.validate((valid, fields) => {
        if (valid) {
          emits('submit', form.value)
        } else {
          console.warn('error submit!', fields)
        }
      })
    }
    // 重置表单
    else if (type === 'reset') {
      form.value = { ...defaultValue.value }
      formEl.resetFields()
      emits('reset')
    }
    // 取消表单
    else if (type === 'cancel') {
      formEl.resetFields()
      emits('cancel')
    }
  },
  1200,
  { leading: true, trailing: false },
)

// 表单初始化
onMounted(() => {
  defaultValue.value = cloneDeep(props.modelValue)
})
</script>

<style lang="scss" scoped>
.va-form {
  height: fit-content;

  &-footer {
    margin-bottom: 0;
  }
}
</style>
