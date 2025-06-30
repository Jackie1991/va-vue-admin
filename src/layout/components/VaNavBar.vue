<template>
  <div class="va-navbar flex-x-center">
    <el-button :icon="Expand" link @click="toggleCollapse" />
    <el-breadcrumb class="vab-breadcrumb" separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index" :to="handleTo(item.redirect)">
        <span>{{ translate(item.meta.title) }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { translate } from '@/i18n'
import { useSettingStore, useRoutesStore } from '@/stores'
import { Expand } from '@element-plus/icons-vue'

const route = useRoute()
const { toggleCollapse } = useSettingStore()
const routesStore = useRoutesStore()
const { routes: breadcrumbRoutes } = storeToRefs(routesStore)

const handleMatched = (routes: VaRouteRecord[], path: string): VaRouteRecord[] => {
  return routes
    .filter((_route) => _route.childrenPathList?.includes(path))
    .flatMap((_route) => (_route.children ? [_route, ...handleMatched(_route.children, path)] : [_route]))
}

const breadcrumbList = computed(() => {
  const matchedRoutes = handleMatched(breadcrumbRoutes.value, route.fullPath)
  if (matchedRoutes.length > 0) return matchedRoutes
  else return handleMatched(breadcrumbRoutes.value, route.path)
})

const handleTo = (path: any) => {
  if (path) return { path }
}
</script>

<style lang="scss" scoped>
.va-navbar {
  height: var(--va-nav-height);
  background-color: var(--va-nav-bg-color);
  padding: 0 15px;
}
</style>
