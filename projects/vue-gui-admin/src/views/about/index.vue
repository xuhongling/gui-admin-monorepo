<template>
  <div class="aboutPage">
    {{ state.name }}
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  const state = reactive({
    name: '关于',
  });
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .aboutPage {
    width: 100%;
    height: 100%;
  }
</style>
