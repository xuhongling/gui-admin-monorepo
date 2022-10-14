<template>
  <div class="homePage">
    {{ state.name }}
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  const state = reactive({
    name: '首页',
  });
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .homePage {
    width: 100%;
    height: 100%;
  }
</style>
