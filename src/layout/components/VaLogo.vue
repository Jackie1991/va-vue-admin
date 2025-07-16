<template>
  <div class="va-logo flex-center">
    <el-image class="logo" :src="getAssetsPath('logo.svg')" />
    <span>{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { getAssetsPath } from '@/utils'
import { useSettingStore } from '@/stores'

const { title } = useSettingStore()
</script>

<style lang="scss" scoped>
.va-logo {
  height: var(--va-logo-height);
  background-color: var(--va-logo-bg-color);

  .logo {
    width: auto;
    height: calc(var(--va-logo-height) / 2.4);
    margin-right: 8px;
  }
}
</style>
