<template>
  <div class="login-container flex-center">
    <va-form v-model="loginInfo" :fields="fields" @submit="handleLogin" />
  </div>
</template>

<script lang="ts" setup>
import type { FieldProps } from '@/components/VaForm/type'
import type { LoginInfo } from '@/api/user'
import { useUserStore } from '@/stores'

const { login } = useUserStore()
const router = useRouter()
// 登录表单数据
const loginInfo = ref<LoginInfo>({
  username: 'admin',
  password: '123456',
})
// 登录表单项
const fields: FieldProps[] = [
  {
    prop: 'username',
    label: '用户名',
    type: 'text',
    placeholder: '请输入用户名',
    rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  },
  {
    prop: 'password',
    label: '密码',
    placeholder: '请输入密码',
    type: 'password',
    rules: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  },
]

const handleLogin = (values: any) => {
  login(values as LoginInfo).then(() => {
    router.replace({ path: '/' })
  })
}
</script>

<style lang="scss" scoped>
// .login-container {}
</style>
