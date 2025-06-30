<template>
  <div class="va-layout" :class="{ mobile, 'is-collapse': collapse }">
    <div class="mobile-mask" v-if="mobile && collapse" @click="updateCollapse(false)" />
    <div class="va-layout-side">
      <component :is="Components['VaLogo']" />
      <component :is="Components['VaSideBar']" :collapse="mobile ? false : collapse" />
    </div>
    <div class="va-layout-main">
      <div class="va-layout-header">
        <component :is="Components['VaNavBar']" />
        <component :is="Components['VaTabs']" />
      </div>
      <div class="va-layout-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore, useRoutesStore } from '@/stores'
import { getComponents } from '@/utils/component'

const imports = import.meta.glob<ComponentType>('./components/*.vue', { eager: true })
const Components = getComponents(imports)

const route = useRoute()
const routesStore = useRoutesStore()
const { activeMenu } = storeToRefs(routesStore)
const settingStore = useSettingStore()
const { collapse } = storeToRefs(settingStore)
const { updateCollapse } = settingStore
const mobile = ref<boolean>(false)

const resizeBody = () => {
  const { width } = useWindowSize()
  mobile.value = width.value - 1 < 992
}

watch(
  () => route,
  () => {
    activeMenu.value = route.path
  },
  { immediate: true },
)

onBeforeMount(() => {
  resizeBody()
  window.addEventListener('resize', resizeBody)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeBody)
})
</script>

<style lang="scss" scoped>
.va-layout {
  --va-layout-sidebar-width: var(--va-sidebar-width);
  overflow: hidden;

  &-side {
    position: fixed;
    z-index: 9;
    inset: 0 auto 0 0;
    width: var(--va-layout-sidebar-width);
    color: white;
    background-color: var(--va-sidebar-bg-color);
    overflow: hidden;
    transition: all 0.15s;
  }

  &-main {
    margin-left: var(--va-layout-sidebar-width);
    background-color: var(--va-main-bg-color);
  }

  &-header {
    position: fixed;
    inset: 0 0 auto var(--va-layout-sidebar-width);
    z-index: 2;
  }

  &-body {
    position: relative;
    z-index: 1;
    padding: var(--va-padding);
    margin-top: calc(var(--va-nav-height) + var(--va-tabs-height));

    [class*='-container'] {
      min-height: calc(100vh - var(--va-nav-height) - var(--va-tabs-height) - var(--va-padding) * 2);
      background-color: white;
    }
  }

  &.is-collapse {
    --va-layout-sidebar-width: 64px;
  }

  .mobile-mask {
    position: fixed;
    inset: 0;
    z-index: 9;
    background-color: rgba($color: #000000, $alpha: 0.1);
  }

  &.mobile {
    --va-layout-sidebar-width: var(--va-sidebar-width);

    .va-layout-side {
      z-index: 10;
      width: 0;
    }

    .va-layout-main {
      margin-left: 0;

      .va-layout-header {
        left: 0;
      }
    }

    &.is-collapse {
      .va-layout-side {
        width: var(--va-layout-sidebar-width);
      }
    }
  }
}
</style>
