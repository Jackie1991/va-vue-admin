export type Pages = {
  pageNo?: number
  pageSize?: number
  total?: number
}

// 分页配置
export interface PaginationProps extends Pages {
  size?: 'large' | 'default' | 'small' // 尺寸
  background?: boolean // 是否有背景色
  layout?: string // 布局，子组件名用逗号分隔
  pageSizes?: number[] // 每页显示个数选择器的选项设置
}

export interface PaginationEmits {
  (e: 'change', currentPage: number, pageSize: number): void
}
