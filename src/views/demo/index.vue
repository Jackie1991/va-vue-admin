<template>
  <div class="demo-container flex-column p4">
    <va-inline-form
      v-model="queryForm"
      :fields="[
        { label: '标题', prop: 'title', type: 'text' },
        {
          label: '状态',
          prop: 'status',
          type: 'select',
          options: [
            { label: '在线', value: 'online' },
            { label: '离线', value: 'offline' },
          ],
        },
      ]"
      @submit="searchQuery"
    />
    <va-table />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  metadata: {
    title: '调试首页',
  },
})

const queryForm = reactive<{ title: string; status: string }>({
  title: '',
  status: '',
})

const searchQuery = (values: any) => {
  console.log(values)
}
</script>

<style lang="scss" scoped>
// .demo-container {}
</style>
