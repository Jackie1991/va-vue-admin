<template>
  <div class="error-container flex-center">
    <div class="number" data-text="404">404</div>
    <p class="tips">请检查地址是否正确，或单击下面的按钮返回主页。</p>
    <router-link class="come-back" to="/">返回首页</router-link>
  </div>
</template>

<style scoped src="./error.scss" />
