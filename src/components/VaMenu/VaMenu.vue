<template>
  <component :is="menuComponent" :menu-item="item">
    <template v-if="item.children && item.children.length > 0">
      <va-menu
        v-for="route in item.children"
        :key="route.path"
        :item="{ ...route, meta: { ...route.meta, hasChildren: true } }"
      />
    </template>
  </component>
</template>

<script setup lang="ts">
import { getComponents } from '@/utils/component'

const imports = import.meta.glob<ComponentType>(['./*.vue', '!./VaMenu.vue'], { eager: true })
const Components = getComponents(imports)

interface Props {
  item: Omit<VaRouteRecord, 'meta'> & { meta: VaRouteMeta & { hasChildren?: boolean } }
}
const props = defineProps<Props>()

const menuComponent = computed(() =>
  props.item.children && props.item.children.some((route: VaRouteRecord) => route.meta.hidden != true)
    ? Components['VaSubMenu']
    : Components['VaMenuItem'],
)
</script>
