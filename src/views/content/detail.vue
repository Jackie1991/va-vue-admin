<template>
  <div class="activity-container flex-column">
    <va-form v-model="formData" :fields="fields" :rules="rules" @submit="formSubmit" @reset="formReset" />
  </div>
</template>

<script lang="ts" setup>
import type { FieldProps } from '@/components/VaForm/type'
import { validateRichTextContent } from '@/utils/validate'
import { useTabsStore } from '@/stores'

const route = useRoute()
const tabsStore = useTabsStore()
const { changeVisitedRouteTitle } = tabsStore
const formData = ref<any>({})
const fields: FieldProps[] = [
  { label: '内容标题', prop: 'title', type: 'text', placeholder: '请输入内容标题', required: true },
  { label: '内容封面', prop: 'cover', type: 'image', placeholder: '请上传内容封面' },
  { label: '内容详情', prop: 'content', type: 'richtext', placeholder: '请输入内容详情', required: true },
]
const rules = {
  title: [
    { required: true, message: '请输入内容标题', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  content: [
    {
      required: true,
      validator: (rule: any, value: any, callback: any) => {
        if (!validateRichTextContent(value)) {
          callback(new Error('请输入内容详情'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

const formSubmit = () => {
  console.log('formData', formData.value)
}

const formReset = () => {}

onBeforeMount(() => {
  let newTitle = ''
  if (route.query.id) {
    newTitle = '内容详情'
  } else {
    newTitle = '内容发布'
  }
  changeVisitedRouteTitle(route.path, newTitle)
})

onMounted(() => {
  console.log('onMounted', route)
  document.title = '123'
})
</script>

<style lang="scss" scoped>
// .activity-container {}
</style>
