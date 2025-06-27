<template>
  <el-menu-item :index="menuItem.path" @click="handleLink">
    <i v-if="collapse && !menuItem.meta.hasChildren">{{ menuItem.meta.title?.charAt(0) }}</i>
    <span :title="translate(menuItem.meta.title)">
      {{ translate(menuItem.meta.title) }}
    </span>
  </el-menu-item>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate'
import { useSettingStore } from '@/stores'
import { translate } from '@/i18n'

interface Props {
  menuItem: Omit<VaRouteRecord, 'meta'> & { meta: VaRouteMeta & { hasChildren?: boolean } }
}
const props = defineProps<Props>()

const route = useRoute()
const router = useRouter()

const settingStore = useSettingStore()
const { collapse } = storeToRefs(settingStore)

const handleLink = () => {
  nextTick(() => {
    const routePath = props.menuItem.path
    const target = props.menuItem.meta.target
    if (target === '_blank') {
      if (isExternal(routePath)) window.open(routePath)
      else window.open(`#${routePath}`)
    } else {
      if (isExternal(routePath)) window.location.href = routePath
      else if (route.path !== routePath) {
        router.push(routePath)
      }
    }
  })
}
</script>
