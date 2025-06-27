<template>
  <div class="error-container flex-center">
    <div class="number">
      <span>4</span>
      <span>0</span>
      <span>3</span>
    </div>
    <p class="tips">服务器拒绝了本地访问，点击下面的按钮返回主页。</p>
    <router-link class="come-back" to="/">返回首页</router-link>
  </div>
</template>

<style scoped src="./error.scss" />
