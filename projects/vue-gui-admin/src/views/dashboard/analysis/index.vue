<template>
  <div class="analysis">
    {{ state.name }}
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  const state = reactive({
    name: '分析页',
  });
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .analysis {
    width: 100%;
    height: 100%;
  }
</style>
