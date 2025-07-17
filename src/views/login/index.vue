<template>
  <div class="login-container flex-y-center">
    <va-form
      v-model="loginInfo"
      :fields="fields"
      submit-text="登录"
      buttons="submit"
      size="large"
      @submit="handleLogin"
    >
      <template #verificationCode>
        <el-input v-model="loginInfo.verificationCode" class="verification-code" type="text">
          <template #suffix>
            <captcha-view v-model="captchaCode" />
          </template>
        </el-input>
      </template>
    </va-form>
  </div>
</template>

<script lang="ts" setup>
import { toUpper } from 'lodash-es'
import type { FieldProps } from '@/components/VaForm/type'
import type { LoginInfo } from '@/api/user'
import { useUserStore } from '@/stores'
import CaptchaView from './components/CaptchaView.vue'

const router = useRouter()
const { login } = useUserStore()
// 登录表单数据
const loginInfo = ref<LoginInfo>({
  username: 'admin',
  password: '123456',
  verificationCode: '',
})
const captchaCode = ref<string>('')
const validateverificationCode = (_: any, value: any, callback: any) => {
  if ('' === value) {
    callback(new Error('验证码不能为空'))
  } else if (toUpper(value) === captchaCode.value) {
    callback()
  } else {
    callback(new Error('验证码错误'))
  }
}
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
  {
    prop: 'verificationCode',
    label: '验证码',
    placeholder: '请输入验证码',
    type: 'text',
    rules: [{ required: true, trigger: 'blur', validator: validateverificationCode }],
  },
]

const handleLogin = (values: any) => {
  login(values as LoginInfo).then(() => {
    router.replace({ path: '/' })
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #005165;
  padding: 50px;

  .va-form {
    background-color: white;
    padding: var(--va-padding);
    border-radius: var(--va-border-radius);

    :deep() {
      .verification-code {
        .el-input__wrapper {
          padding-right: 0;
        }
      }
    }
  }
}
</style>
