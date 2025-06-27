<template>
  <template v-if="menuItem.meta && menuItem.meta.levelHidden">
    <template v-for="route in menuItem.children" :key="route.path">
      <va-menu :item="route" />
    </template>
  </template>
  <el-sub-menu v-else :index="menuItem.path">
    <template #title>
      <i v-if="collapse">{{ menuItem.meta.title.charAt(0) }}</i>
      <span :title="translate(menuItem.meta.title)">
        {{ translate(menuItem.meta.title) }}
      </span>
    </template>
    <slot></slot>
  </el-sub-menu>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/stores'
import { translate } from '@/i18n'

interface Props {
  menuItem: Omit<VaRouteRecord, 'meta'> & { meta: VaRouteMeta & { hasChildren?: boolean } }
}
defineProps<Props>()

const settingStore = useSettingStore()
const { collapse } = storeToRefs(settingStore)
</script>

<style lang="scss" scoped></style>
