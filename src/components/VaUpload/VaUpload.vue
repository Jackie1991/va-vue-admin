<template>
  <div class="va-upload">
    <el-upload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false">
      <!-- <el-icon><Plus /></el-icon> -->
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import type { TitleProps } from './type'

// 组件的类型props和方法emit
withDefaults(defineProps<TitleProps>(), {
  text: '',
})
</script>

<style lang="scss" scoped>
.va-upload {
}
</style>
