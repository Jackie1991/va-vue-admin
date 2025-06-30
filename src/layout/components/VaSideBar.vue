<template>
  <el-scrollbar class="va-side-bar">
    <el-menu
      background-color="var(--va-menu-bg-color)"
      :collapse="collapse"
      :collapse-transition="false"
      :default-active="activeMenu"
      menu-trigger="click"
      mode="vertical"
      text-color="var(--va-menu-color-text)"
      unique-opened
    >
      <va-menu v-for="(item, index) in menuRoutes" :key="index + item.name" :item="item" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useRoutesStore } from '@/stores'

defineProps<{
  collapse: boolean
}>()
const routesStore = useRoutesStore()
const { routes, activeMenu } = storeToRefs(routesStore)

const menuRoutes = computed(() =>
  routes.value.flatMap((route: any) => (route.meta.levelHidden && route.children ? [...route.children] : route)),
)
</script>

<style lang="scss" scoped>
.va-side-bar {
  :deep() {
    .el-menu {
      border-right: 0;
    }

    .el-menu-item:hover,
    .el-sub-menu__title:hover {
      background-color: var(--va-menu-hover-bg-color);
    }
  }
}
</style>
