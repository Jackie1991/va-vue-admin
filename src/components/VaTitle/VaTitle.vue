<template>
  <div class="va-title flex-x-center">
    <div class="va-title-text">{{ text }}</div>
    <div class="va-title-action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TitleProps } from './type'

// 组件的类型props和方法emit
withDefaults(defineProps<TitleProps>(), {
  text: '',
})
</script>

<style lang="scss" scoped>
.va-title {
  font-size: 1.12rem;
  margin: 20px 0 10px;

  &-text {
    margin-right: auto;
    white-space: nowrap;
  }
}
</style>
