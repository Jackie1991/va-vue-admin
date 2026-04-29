<template>
  <div class="va-editor flex-column">
    <toolbar class="va-editor-toolbar" :editor="editorInstance" :default-config="toolbarConfig" :mode="mode" />
    <editor
      class="va-editor-html"
      v-model="html"
      :default-config="editorConfig"
      :mode="mode"
      :style="{ height }"
      @onCreated="onCreated"
    />
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IDomEditor } from '@wangeditor/editor'
import type { EditorProps, EditorEmits } from './type'
import '@wangeditor/editor/dist/css/style.css'

// 组件的类型props和方法emit
const props = withDefaults(defineProps<EditorProps>(), {
  modelValue: '',
  height: '480px',
})
const emits = defineEmits<EditorEmits>()

// 编辑器实例
const editorInstance = ref<any>(null)
// 内容HTML
const html = useVModel(props, 'modelValue', emits)
const mode = ref('default')
// 工具栏配置
const toolbarConfig = {
  excludeKeys: ['fullScreen', 'group-video'],
}
// 编辑器配置
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '/api/upload',
      fieldName: 'file',
      base64LimitSize: 10 * 1024, // 10kb
      maxFileSize: 10 * 1024 * 1024, // 10M
      withCredentials: false,
      maxNumberOfFiles: 5,
      allowedFileTypes: ['image/*'],
      onSuccess(file: any, res: any) {
        console.log(res)
      },
      onError(file: any, res: any) {
        console.log(res)
      },
      onProgress(file: any, percent: any) {
        console.log(percent)
      },
      onChange(file: any, res: any) {
        console.log(res)
      },
    },
  },
}

const onCreated = (editor: IDomEditor) => {
  editorInstance.value = editor
}
</script>

<style lang="scss" scoped>
.va-editor {
  border: 1px solid var(--el-input-border-color, var(--el-border-color));
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));

  &-toolbar {
    border-bottom: 1px solid #ccc;
  }

  &-html {
    overflow-y: hidden;
  }
}
</style>
