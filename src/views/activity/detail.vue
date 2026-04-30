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
const formData = ref<Record<string, any>>({})
const fields: FieldProps[] = [
  { label: '活动标题', prop: 'title', type: 'text', placeholder: '请输入活动标题', required: true },
  { label: '活动封面', prop: 'cover', type: 'image', placeholder: '请上传活动封面' },
  { label: '活动开始时间', prop: 'startTime', type: 'datetime', placeholder: '请选择活动开始时间', required: true },
  { label: '活动结束时间', prop: 'endTime', type: 'datetime', placeholder: '请选择活动结束时间', required: true },
  { label: '活动地点', prop: 'location', type: 'text', placeholder: '请输入活动地点', required: true },
  { label: '活动人数', prop: 'peopleNum', type: 'number', placeholder: '请输入活动人数' },
  { label: '活动详情', prop: 'content', type: 'richtext', placeholder: '请输入活动详情', required: true },
]
const rules = {
  title: [
    { required: true, message: '请输入活动标题', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  startTime: [{ required: true, message: '请选择活动开始时间', trigger: 'change' }],
  endTime: [{ required: true, message: '请选择活动结束时间', trigger: 'change' }],
  location: [{ required: true, message: '请输入活动地点', trigger: 'blur' }],
  content: [
    {
      required: true,
      validator: (rule: any, value: any, callback: any) => {
        if (!validateRichTextContent(value)) {
          callback(new Error('请输入活动详情'))
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
    newTitle = '活动详情'
  } else {
    newTitle = '活动发布'
  }
  changeVisitedRouteTitle(route.fullPath, newTitle)
})

onMounted(() => {
  console.log('onMounted', route)
  document.title = '123'
})
</script>

<style lang="scss" scoped>
// .activity-container {}
</style>
