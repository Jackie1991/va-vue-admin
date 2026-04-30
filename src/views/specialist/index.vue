<template>
  <div class="specialist-container flex-column">
    <va-inline-form
      v-model="formQuery"
      :fields="[
        { label: '姓名', prop: 'name', type: 'text', placeholder: '请输入姓名' },
        { label: '状态', prop: 'status', type: 'select', options: ['进行中', '已结束'], placeholder: '请选择状态' },
      ]"
      @submit="searchQuery"
    />
    <va-title text="专家列表">
      <template #action>
        <el-button type="primary" @click="toggleDialog('add')">新增</el-button>
      </template>
    </va-title>
    <va-table
      :data="list"
      index
      :fields="[
        { label: '姓名', prop: 'name' },
        { label: '照片', prop: 'photo', columnType: 'image', width: 84 },
        { label: '擅长领域', prop: 'field' },
        { label: '专业背景', prop: 'background' },
        { label: '从业经历', prop: 'experience' },
      ]"
      :page-no="pageQuery.pageNo"
      :page-size="pageQuery.pageSize"
      :total="total"
      :action="actionConfig"
      @page-change="changePage"
    />

    <va-dialog v-model="dialogVisible" :title="dialogTitle" @close="closeDialog">
      <va-form v-model="formData" :fields="fields" :rules="rules" @submit="formSubmit" />
    </va-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumnAction } from '@/components/VaTable/type'
import type { FieldProps } from '@/components/VaForm/type'

// 分页参数
const pageQuery = reactive<Omit<PagesType, 'total'>>({
  pageNo: 1,
  pageSize: 10,
})
// 列表查询参数
const formQuery = ref<Record<string, any>>({})
const total = ref<number>(0) // 分页总数
const list = ref<any[]>([]) // 列表数据
const dialogVisible = ref<boolean>(false) // 弹窗显示
const dialogTitle = ref<string>('') // 弹窗显示
const formData = ref<Record<string, any>>({}) // 表单数据

// 列表操作配置
const actionConfig: TableColumnAction = {
  label: '操作',
  fixed: 'right',
  width: 115,
  list: [
    {
      label: '编辑',
      type: 'primary',
      link: true,
      onClick: (row: any) => {
        console.log('编辑', row)
        toggleDialog('edit', row)
      },
    },
    {
      label: '删除',
      type: 'danger',
      link: true,
      onClick: (row: any) => {
        console.log('删除', row)
      },
    },
  ],
}

// 表单配置
const fields: FieldProps[] = [
  { label: '姓名', prop: 'name', type: 'text', placeholder: '请输入姓名', required: true },
  { label: '照片', prop: 'photo', type: 'image', placeholder: '请上传照片' },
  { label: '擅长领域', prop: 'field', type: 'textarea', placeholder: '请输入擅长领域', required: true },
  { label: '专业背景', prop: 'background', type: 'textarea', placeholder: '请输入专业背景', required: true },
  { label: '从业经历', prop: 'experience', type: 'textarea', placeholder: '请输入从业经历', required: true },
]
// 表单校验规则
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  field: [{ required: true, message: '请输入擅长领域', trigger: 'blur' }],
  background: [{ required: true, message: '请输入专业背景', trigger: 'blur' }],
  experience: [{ required: true, message: '请输入从业经历', trigger: 'blur' }],
}

// 获取列表
const getList = async () => {
  console.log(Object.assign(formQuery.value, pageQuery))
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

// 弹窗切换
const toggleDialog = (type: 'add' | 'edit', row?: any) => {
  dialogTitle.value = type === 'add' ? '新增专家' : '编辑专家'
  if (type === 'edit') {
    formData.value = row
  } else {
    formData.value = {}
  }
  dialogVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
  formData.value = {}
  dialogVisible.value = false
}

// 表单提交
const formSubmit = () => {
  console.log('表单提交', formData.value)
  closeDialog()
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
