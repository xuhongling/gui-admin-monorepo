<template>
  <div class="globalMap" ref="wrapRef" :style="{ height, width }"></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { initBasicMap } from './olMap';

  const wrapRef = ref<HTMLDivElement | null>(null);

  defineProps({
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
  });

  onMounted(() => {
    initBasicMap(wrapRef);
  });
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .globalMap {
    width: 100%;
    height: 100%;
  }
</style>
