<template>
  <div class="menu-container flex-column">
    <va-table
      :data="list"
      index
      :fields="[
        { label: '菜单名称', prop: 'a' },
        { label: '路径', prop: 'b' },
      ]"
      :page-no="query.pageNo"
      :page-size="query.pageSize"
      :total="total"
      @page-change="changePage"
    />
  </div>
</template>

<script lang="ts" setup>
const query = reactive<Omit<PagesType, 'total'>>({
  pageNo: 1,
  pageSize: 10,
})
const total = ref<number>(0)
const list = ref<any[]>([])

// 获取列表
const getList = () => {
  console.log(query)
}

// 分页切换
const changePage = (pageNo: number, pageSize: number) => {
  query.pageNo = pageNo
  query.pageSize = pageSize
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
