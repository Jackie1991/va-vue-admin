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
  { label: '内容开始时间', prop: 'startTime', type: 'datetime', placeholder: '请选择内容开始时间', required: true },
  { label: '内容结束时间', prop: 'endTime', type: 'datetime', placeholder: '请选择内容结束时间', required: true },
  { label: '内容地点', prop: 'location', type: 'text', placeholder: '请输入内容地点', required: true },
  { label: '内容人数', prop: 'peopleNum', type: 'number', placeholder: '请输入内容人数' },
  { label: '内容详情', prop: 'content', type: 'richtext', placeholder: '请输入内容详情', required: true },
]
const rules = {
  title: [
    { required: true, message: '请输入内容标题', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  startTime: [{ required: true, message: '请选择内容开始时间', trigger: 'change' }],
  endTime: [{ required: true, message: '请选择内容结束时间', trigger: 'change' }],
  location: [{ required: true, message: '请输入内容地点', trigger: 'blur' }],
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
