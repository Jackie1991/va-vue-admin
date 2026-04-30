<template>
  <div class="va-table">
    <el-table :data="props.data" v-bind="propsAttr">
      <el-table-column v-if="props.index" type="index" :index="forIndex" label="序号" width="68" />
      <el-table-column v-for="field in fields" :key="field.prop" v-bind="field">
        <template #default="{ row }">
          <el-image
            v-if="field.columnType === 'image'"
            class="va-table-image"
            :src="row[field.prop]"
            preview-teleported
            :preview-src-list="[row[field.prop]]"
          />
          <template v-else>
            {{ row[field.prop] }}
          </template>
        </template>
      </el-table-column>
      <el-table-column v-if="propsActions.length > 0" v-bind="propsAction">
        <template #default="{ row }">
          <el-button
            v-for="({ label, type, link, disabled, onClick }, acInx) in propsActions"
            :key="acInx"
            :type="type"
            :link="link"
            :disabled="hasDisabled(disabled, row, acInx)"
            @click="() => onClick && onClick(row, acInx)"
          >
            {{ label }}
          </el-button>
        </template>
      </el-table-column>
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
import type { TableProps, TableEmits, TableColumnAction } from './type'

const excludeProp = [
  'index',
  'startIndex',
  'selection',
  'data',
  'fields',
  'action',
  'pageNo',
  'pageSize',
  'total',
] as const
type ExcludeType = (typeof excludeProp)[number]

// 组件的类型props和方法emit
const props = withDefaults(defineProps<TableProps>(), {
  size: 'default',
  emptyText: '暂无数据',
  pagination: true,
  action: () => ({
    label: '操作',
    list: [],
  }),
})
const propsAttr = computed<Omit<TableProps, ExcludeType>>(() => omit(props, excludeProp))
const propsAction = computed<Omit<TableColumnAction, 'list'>>(() => omit(props.action, 'list'))
const propsActions = computed(() => (Array.isArray(props.action.list) ? props.action.list : []))

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

const hasDisabled = (value: any, row: any, index: number): boolean => {
  if (typeof value === 'function') {
    return value(row, index)
  }
  if (typeof value === 'boolean') {
    return value
  }
  return false
}
</script>

<style lang="scss" scoped>
.va-table {
  .el-table {
    width: 100%;
  }

  .va-table-image {
    display: block;
    width: 60px;
    height: 60px;
  }
}
</style>
