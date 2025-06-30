<script setup lang="ts">
import { useSettingStore } from '@/stores'
import { zhLocale, enLocale } from '@/i18n'

const settingStore = useSettingStore()

const locale = computed(() => (settingStore.language === 'zh' ? zhLocale : enLocale))
</script>

<template>
  <el-config-provider :button="{ autoInsertSpace: true }" :locale="locale">
    <router-view />
  </el-config-provider>
</template>
