<template>
  <el-pagination
    class="va-pagination"
    v-bind="propsAttr"
    @change="(currentPage: number, pageSize: number) => emits('change', currentPage, pageSize)"
  />
</template>

<script lang="ts" setup>
import { omit } from 'lodash-es'
import type { PaginationProps, PaginationEmits } from './type'

const excludeProp = ['pageNo', 'pageSize'] as const
type ExcludeType = (typeof excludeProp)[number]

// 组件的类型props和方法emit
const props = withDefaults(defineProps<PaginationProps>(), {
  pageNo: 1,
  pageSize: 10,
  total: 0,
  size: 'default',
  background: false,
  layout: 'total, sizes, prev, pager, next',
  pageSizes: () => [10, 20, 30, 40, 50, 100],
})
const propsAttr = computed<Omit<PaginationProps, ExcludeType>>(() => omit(props, excludeProp))

const emits = defineEmits<PaginationEmits>()
</script>

<style lang="scss" scoped>
.va-pagination {
  justify-content: center;
  margin: 20px 0;
}
</style>
