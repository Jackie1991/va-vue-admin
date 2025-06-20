<script setup lang="ts">
const res: ResponseData<unknown> = {
  code: 100,
  message: 'success',
  data: {
    name: 'zhangsan',
    age: 18,
  },
}

const user = ref<Record<string, unknown>>({})
const fields = [
  {
    label: '姓名',
    prop: 'name',
  },
]
console.log(res, user)
</script>

<template>
  <main>
    <va-form v-model="user" :fields="fields" />
  </main>
</template>
