import type { TableV2Props } from 'element-plus'
import type { Pages } from '@/components/VaPagination/type'

export type TableProp = TableV2Props

export type TableColumnField = {
  label: string
  prop: string
  width?: number | string
  minWidth?: number | string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  showOverflowTooltip?: boolean
  fixed?: boolean
  formatter?: (row: any, column: any, cellValue: any, index: number) => string
}

// 表格配置
export interface TableProps extends Pages {
  data: any[]
  fields: TableColumnField[]
  index?: boolean // 是否显示序号
  selection?: boolean // 是否显示多选框
  stripe?: boolean // 是否显示斑马纹
  border?: boolean // 是否显示边框
  size?: '' | 'large' | 'default' | 'small' // 表格尺寸
  emptyText?: string // 空数据时显示的文本内容
  pagination?: boolean // 是否显示分页
}

export interface TableEmits {
  (e: 'page-change', currentPage: number, pageSize: number): void
}
