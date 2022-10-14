<template>
  <div class="workbench">
    {{ state.name }}
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  const state = reactive({
    name: '工作台',
  });
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .workbench {
    width: 100%;
    height: 100%;
  }
</style>
