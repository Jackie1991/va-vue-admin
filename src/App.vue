<script setup lang="ts">
import Layout from '@/layout/index.vue'
import { constantRoutes } from '@/router'
import { useSettingStore } from '@/stores'
import { zhLocale, enLocale } from '@/i18n'

const route = useRoute()
const settingStore = useSettingStore()

const locale = computed(() => (settingStore.language === 'zh' ? zhLocale : enLocale))

// 是否使用容器组件
const shouldUseContainer = computed<boolean>(() => {
  return constantRoutes.findIndex((elRoute) => elRoute.name === route.name) === -1
})
</script>

<template>
  <el-config-provider :locale="locale">
    <layout v-if="shouldUseContainer" />
    <router-view v-else></router-view>
  </el-config-provider>
</template>
