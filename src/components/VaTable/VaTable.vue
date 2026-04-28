<template>
  <div class="va-table">
    <el-table :data="props.data" v-bind="propsAttr">
      <el-table-column v-if="props.index" type="index" :index="forIndex" label="序号" width="68" />
      <el-table-column v-for="field in fields" :key="field.prop" v-bind="field" />
    </el-table>
    <va-pagination
      :page-no="props.pageNo"
      :page-size="props.pageSize"
      :total="props.total"
      @change="paginationChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { omit } from 'lodash-es'
import type { TableProps, TableEmits } from './type'

const excludeProp = ['index', 'startIndex', 'selection', 'data', 'fields', 'pageNo', 'pageSize', 'total'] as const
type ExcludeType = (typeof excludeProp)[number]

// 组件的类型props和方法emit
const props = withDefaults(defineProps<TableProps>(), {
  size: 'default',
  emptyText: '暂无数据',
  pagination: true,
})
const propsAttr = computed<Omit<TableProps, ExcludeType>>(() => omit(props, excludeProp))

const emits = defineEmits<TableEmits>()

// 序号计算
const forIndex = (index: number) => {
  const num = index + 1
  if (props.pageNo && props.pageNo > 0 && props.pageSize && props.pageSize > 0) {
    return (props.pageNo - 1) * props.pageSize + num
  }
  return num
}

const paginationChange = (pageNo: number, pageSize: number) => {
  emits('page-change', pageNo, pageSize)
}
</script>

<style lang="scss" scoped>
.va-table {
  .el-table {
    width: 100%;
  }
}
</style>
