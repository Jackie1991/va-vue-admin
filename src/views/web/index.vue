<template>
  <div class="web-container flex-column">
    <div class="web-header">
      <div class="trademark">{{ title }}</div>
    </div>
    <div class="web-body flex-1 h-0 p-4">
      <p>演示</p>
    </div>
    <div class="web-footer"></div>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/stores'

defineOptions({
  metadata: {
    title: '门户首页',
  },
})

const { title } = useSettingStore()
</script>

<style lang="scss" scoped>
.web-container {
  .web-footer {
    background-color: chocolate;
    padding: 10px 0;
  }
}
</style>
