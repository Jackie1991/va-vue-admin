<template>
  <div class="activity-container flex-column">
    <va-inline-form
      v-model="formQuery"
      :fields="[
        { label: '姓名', prop: 'name', type: 'text', placeholder: '请输入姓名' },
        { label: '状态', prop: 'status', type: 'select', options: ['进行中', '已结束'], placeholder: '请选择状态' },
      ]"
      @submit="searchQuery"
    />
    <va-title text="预约时间表" />
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
import type { TableColumnAction } from '@/components/VaTable/type'

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
  list: [{ label: '删除', type: 'danger', link: true }],
}

// 获取列表
const getList = async () => {
  console.log(Object.assign(formQuery, pageQuery))
}

// 查询
const searchQuery = () => {
  pageQuery.pageNo = 1
  pageQuery.pageSize = 10
  getList()
}

// 分页切换
const changePage = (pageNo: number, pageSize: number) => {
  pageQuery.pageNo = pageNo
  pageQuery.pageSize = pageSize
  getList()
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
