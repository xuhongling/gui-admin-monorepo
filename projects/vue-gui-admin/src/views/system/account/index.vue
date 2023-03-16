<template>
  <div>
    {{state.name}}
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  const state = reactive({
    name: '账号',
  });
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
