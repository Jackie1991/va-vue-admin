<template>
  <div class="va-navbar">
    <el-button :icon="Expand" link @click="toggleCollapse" />
    va-navbar
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/stores'
import { Expand } from '@element-plus/icons-vue'

const { toggleCollapse } = useSettingStore()
</script>

<style lang="scss" scoped>
.va-navbar {
  height: var(--va-nav-height);
  background-color: var(--va-nav-bg-color);
}
</style>
