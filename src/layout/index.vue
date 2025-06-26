<template>
  <div>
    <ul>
      <li v-for="item in routes" :key="item.path" @click="handleLink(item)">{{ item.meta?.title }}</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { useRoutesStore } from '@/stores'

const router = useRouter()
const routesStore = useRoutesStore()
const { routes } = storeToRefs(routesStore)

const handleLink = (route) => {
  console.log(route)
  router.push(route.path)
}
</script>
