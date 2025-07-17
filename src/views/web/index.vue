<template>
  <div class="web-container flex-column">
    <header class="web-header">
      <div class="web-wrapper">
        <div class="trademark">{{ title }}</div>
      </div>
    </header>
    <section class="web-body flex-1 h-0">
      <div class="web-wrapper">
        <p>演示</p>
      </div>
    </section>
    <footer class="web-footer">
      <div class="web-wrapper">
        <p>借鉴了部分平台的设计风格</p>
      </div>
    </footer>
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
  .web-wrapper {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
  }

  .web-footer {
    color: #aaa;
    background-color: #333333;
    padding: 10px 0;
  }
}
</style>
