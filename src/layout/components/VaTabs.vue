<template>
  <div class="va-tabs flex-between">
    <el-tabs v-model="tabActive" class="va-tabs-content" @tab-click="handleTabClick" @tab-remove="handleTabRemove">
      <el-tab-pane
        v-for="item in visitedRoutes"
        :key="item.path"
        :name="item.path"
        :label="item.meta.title"
        :closable="!(item.meta && item.meta.noClosable)"
      />
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { stringify } from 'qs'
import { useTabsStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()
const { visitedRoutes } = storeToRefs(tabsStore)
const { addVisitedRoute, removeVisitedRoute } = tabsStore
const tabActive = ref<string>('')

// 是否当前标签
const isActive = (path: string) => path === tabActive.value

// 添加tabs
const addTabs = async (route: VaRoute) => {
  const path =
    route.query && Object.keys(route.query).length > 0 ? `${route.path}?${stringify(route.query)}` : route.path
  await addVisitedRoute({
    path,
    name: route.name,
    query: route.query,
    params: route.params,
    meta: { ...route.meta },
  })
  tabActive.value = path
}

/**
 * 跳转最后一个标签页
 */
const toLastTab = async () => {
  const latestView = visitedRoutes.value.find((item) => item.path !== tabActive.value)
  if (latestView) await router.push(latestView)
  else await router.push('/')
}

const handleTabClick = (tab: any) => {
  const clickTab = visitedRoutes.value[tab.index]
  if (clickTab.path === tabActive.value) return
  router.push(clickTab)
}

/**
 * 根据原生路径删除标签中的标签
 * @param rawPath 原生路径
 * @returns {Promise<void>}
 */
const handleTabRemove = async (rawPath: any) => {
  if (isActive(rawPath)) await toLastTab()
  await removeVisitedRoute(rawPath)
}

watch(
  () => route.fullPath,
  () => {
    addTabs(route)
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.va-tabs {
  height: var(--va-tabs-height);
  background-color: var(--va-tabs-bg-color);
  box-shadow: inset 0 1px 5px 0 rgba(0, 0, 0, 0.1);

  &-content {
    --el-tabs-header-height: var(--va-tabs-height);

    flex: 1;
    width: 0;

    :deep() {
      .el-tabs__header.is-top {
        margin-bottom: 0;

        .el-tabs__item {
          padding: 0 10px;
        }
      }

      .el-tabs__content {
        display: none;
      }
    }
  }
}
</style>
