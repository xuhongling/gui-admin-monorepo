<template>
  <div class="globalMap" ref="wrapRef" :style="{ height, width }"></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { initBasicMap, getGlobalMap } from './olMap';

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

  onUnmounted(() => {
    const olMap = getGlobalMap();
    if (olMap) {
      const layers = olMap.getAllLayers();
      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        const layerName = layer.get('layerName');
        if (layerName) {
          layer.getSource().clear(true)
        }
      }
      olMap.setTarget(null);
      olMap.dispose();
    }
  });
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .globalMap {
    width: 100%;
    height: 100%;
  }
</style>
