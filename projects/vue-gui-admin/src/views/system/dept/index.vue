<template>
  <div>
    {{state.name}}
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  const state = reactive({
    name: '部门',
  });
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
