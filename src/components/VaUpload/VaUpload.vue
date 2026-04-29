<template>
  <div class="va-upload">
    <el-upload
      v-model:file-list="fileList"
      :auto-upload="true"
      v-bind="propsAttr"
      :before-upload="handleBeforeUpload"
      :http-request="handleCustomRequest"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
    >
      <el-icon><plus /></el-icon>
    </el-upload>
    <va-dialog class-name="el-dialog-light" v-model="dialogVisible" fullscreen append-to-body>
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </va-dialog>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { omit } from 'lodash-es'
import type { UploadProps, UploadEmits } from './type'
import type { UploadFile, UploadFiles, UploadRawFile, UploadRequestOptions } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { upload as uploadFile } from '@/api/fiile'

const excludeProp = ['modelValue', 'maxSize'] as const
type ExcludeType = (typeof excludeProp)[number]

// 组件的类型props和方法emit
const props = withDefaults(defineProps<UploadProps>(), {
  modelValue: () => [],
  action: '#',
  accept: 'image/*',
  listType: 'picture-card',
  showFileList: true,
  data: () => ({}),
  maxSize: 2,
})
const propsAttr = computed<Omit<UploadProps, ExcludeType>>(() => omit(props, excludeProp))
const emits = defineEmits<UploadEmits>()

// 上传文件列表
const fileList = ref<UploadFile[]>([])
const dialogImageUrl = ref<string>('')
const dialogVisible = ref<boolean>(false)

// 监听父组件传入的列表，实现同步
watch(
  () => props.modelValue,
  (newUrls: string[]) => {
    console.log(newUrls)
    if (!Array.isArray(newUrls)) return
    fileList.value = newUrls.map((url, index) => ({
      name: `图片${index + 1}`,
      url: url,
      uid: Number(`${dayjs().valueOf()}${index}`), // 唯一ID
      status: 'success',
    }))
  },
  { deep: true, immediate: true },
)

// 上传前
const handleBeforeUpload = (rawFile: UploadRawFile) => {
  const { maxSize } = props
  if (maxSize > 0) {
    const isLtMaxSize = rawFile.size / 1024 / 1024 > maxSize
    if (isLtMaxSize) {
      $baseMessage(`上传文件大小不能超过 ${maxSize}MB!`, 'error')
      return false
    }
  }
  return true
}

// 自定义上传
const handleCustomRequest = async (options: UploadRequestOptions) => {
  try {
    const res = await uploadFile(options.file)
    console.log(res)

    options.onSuccess('success')
  } catch (err: any) {
    options.onError(err)
  }
}

// 上传成功
const handleSuccess = (res: any, file: UploadFile) => {
  console.log(res, file)
  $baseMessage(`上传成功`, 'success')
  updateModelValue()
}

// 上传失败
const handleError = (error: Error) => {
  $baseMessage(`上传失败：${error.message}`, 'error')
}

// 预览
const handlePreview = (uploadFile: UploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// 移除
const handleRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(uploadFile, uploadFiles)
  updateModelValue()
}

// 更新modelValue
const updateModelValue = () => {
  const urlList = fileList.value.map((item) => item.url).filter(Boolean) as string[]
  emits('update:modelValue', urlList)
}
</script>

<style lang="scss" scoped>
.va-upload {
  width: 100%;
}
</style>
