<template>
  <div class="user-container flex-column">
    <va-inline-form
      v-model="formQuery"
      :fields="[
        { label: '名称', prop: 'name', type: 'text' },
        { label: '类型', prop: 'type', type: 'select', options: userTypes },
      ]"
      @submit="searchQuery"
    />
    <va-table
      :data="list"
      index
      :fields="[
        { label: '姓名', prop: 'name' },
        { label: '类型', prop: 'type' },
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
const list = ref<any[]>([{ name: '张三', type: '客户' }])
const userTypes = ['客户', '专家', '管理员']

const actionConfig: TableColumnAction = {
  label: '操作',
  list: [
    {
      label: '编辑',
      type: 'primary',
      onClick: () => {
        console.log('编辑')
      },
    },
    { label: '删除', type: 'danger' },
  ],
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
