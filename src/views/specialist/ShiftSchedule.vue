<template>
  <div class="schedule-container flex-column">
    <el-calendar class="schedule-calendar" v-model="scheduleDay" />
    <va-title text="日历排班表">
      <template #action>
        <el-button type="primary" @click="$router.push('/activity/detail')">添加</el-button>
      </template>
    </va-title>
    <va-table
      :data="list"
      index
      :fields="[
        { label: '姓名', prop: 'name' },
        { label: '类型', prop: 'type' },
        { label: '开始时间', prop: 'startTime' },
        { label: '结束时间', prop: 'endTime' },
        { label: '发布时间', prop: 'publishTime' },
      ]"
      :page-no="pageQuery.pageNo"
      :page-size="pageQuery.pageSize"
      :total="total"
      :action="actionConfig"
      @page-change="changePage"
    />
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { TableColumnAction } from '@/components/VaTable/type'
import router from '@/router'

const scheduleDay = ref(new Date())
const pageQuery = reactive<Omit<PagesType, 'total'>>({
  pageNo: 1,
  pageSize: 10,
})
const formQuery = reactive({
  pageNo: 1,
  pageSize: 10,
})
const total = ref<number>(0)
const list = ref<any[]>([
  { id: 1, title: '张三', type: '客户', startTime: '2022-01-01', endTime: '2022-01-01', publishTime: '2022-01-01' },
])

const actionConfig: TableColumnAction = {
  label: '操作',
  fixed: 'right',
  width: 115,
  list: [
    {
      label: '编辑',
      type: 'primary',
      link: true,
      onClick: (row: any) => {
        console.log('编辑', row)
        router.push(`/activity/detail?id=${row.id}`)
      },
    },
    { label: '删除', type: 'danger', link: true },
  ],
}

// 获取列表
const getList = async () => {
  const day = dayjs(scheduleDay.value).format('YYYY-MM-DD')
  console.log(Object.assign(formQuery, pageQuery), day)
}

// 分页切换
const changePage = (pageNo: number, pageSize: number) => {
  pageQuery.pageNo = pageNo
  pageQuery.pageSize = pageSize
  getList()
}

watch(
  () => scheduleDay.value,
  () => {
    getList()
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.schedule-container {
  .schedule-calendar {
    :deep() {
      .el-calendar__body {
        padding: 10px 0;
      }

      .el-calendar-table .el-calendar-day {
        height: auto;
        text-align: center;
      }
    }
  }
}
</style>
