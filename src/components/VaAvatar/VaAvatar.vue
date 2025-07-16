<template>
  <el-dropdown class="va-avatar" width="auto">
    <div class="avatar-reference flex-center">
      <el-avatar class="user-avatar" :src="userInfo.avatar" />
      <span class="user-name">{{ userInfo.username }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) in dropdownMenus"
          :key="index"
          :divided="index === dropdownMenus.length - 1"
          @click.stop="handleCommand(item.type)"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores'
import { toLoginRoute } from '@/router/permissions'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { logout } = userStore
const { userInfo } = storeToRefs(userStore)

const dropdownMenus = [
  { label: '个人中心', type: 'personalCenter' },
  { label: '修改密码', type: 'password' },
  { label: '退出登录', type: 'logout' },
] as const

const handleCommand = async (type: (typeof dropdownMenus)[number]['type']) => {
  switch (type) {
    case 'personalCenter':
      break
    case 'password':
      break
    case 'logout':
      await logout()
      await router.push(toLoginRoute(route.fullPath))
      break
  }
}
</script>

<style lang="scss" scoped>
.avatar-reference {
  .user-avatar {
    flex: none;
    margin-right: 12px;
    pointer-events: none;
    box-shadow: 0 0 5px 0 rgba($color: #000000, $alpha: 0.2);
  }

  .user-name {
    max-width: 90px;
    @include text-ellipsis;
  }
}

.va-dropdown-menu {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    line-height: 1.8;
    text-align: center;
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
      border-radius: var(--el-border-radius-base);
    }
  }
}
</style>
