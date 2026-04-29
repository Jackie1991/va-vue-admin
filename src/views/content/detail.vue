<template>
  <div class="activity-container flex-column">
    <va-form v-model="formData" :fields="fields" @submit="formSubmit" @reset="formReset" />
  </div>
</template>

<script lang="ts" setup>
import type { FieldProps } from '@/components/VaForm/type'

const route = useRoute()
const formData = ref({})
const fields: FieldProps[] = [
  { label: '活动标题', prop: 'title', type: 'text', placeholder: '请输入活动标题' },
  { label: '活动封面', prop: 'cover', type: 'image', placeholder: '请上传活动封面' },
  { label: '活动开始时间', prop: 'startTime', type: 'datetime', placeholder: '请选择活动开始时间' },
  { label: '活动结束时间', prop: 'endTime', type: 'datetime', placeholder: '请选择活动结束时间' },
  { label: '活动地点', prop: 'location', type: 'text', placeholder: '请输入活动地点' },
  { label: '活动人数', prop: 'peopleNum', type: 'number', placeholder: '请输入活动人数' },
  { label: '活动详情', prop: 'content', type: 'richtext', placeholder: '请输入活动详情' },
]

const formSubmit = () => {}

const formReset = () => {}

onMounted(() => {
  console.log('route', route)
})
</script>

<style lang="scss" scoped>
// .activity-container {}
</style>
