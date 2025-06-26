<script setup lang="ts">
import Layout from '@/layout/index.vue'
import { useSettingStore } from '@/stores'

const settingStore = useSettingStore()
</script>

<template>
  <el-config-provider :locale="settingStore.locale">
    <layout />
  </el-config-provider>
</template>
