<template>
  <div class="menu-container flex-column">
    <va-table
      :data="list"
      index
      :fields="[
        { label: 'a', prop: 'a' },
        { label: 'b', prop: 'b' },
      ]"
      :page-no="query.pageNum"
      :page-size="query.pageSize"
      :total="100"
      @page-change="changePage"
    />
  </div>
</template>

<script lang="ts" setup>
const query = reactive({
  pageNum: 1,
  pageSize: 10,
})
const list = []

const changePage = (pageNo: number, pageSize: number) => {
  console.log(pageNo, pageSize)
  query.pageNum = pageNo
  query.pageSize = pageSize
}
</script>

<style lang="scss" scoped>
// .index-container {}
</style>
