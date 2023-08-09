<template>
  <div class="homePage">
    <GlobalMap />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { getMenuList } from '@/api/system/menu';
  import { GlobalMap, getGlobalMap } from '@/components/global-map';
  import { addWmsLayer, getWmsFeature } from 'gmap-ol';

  const addMapData = async () => {
    const olMap = await getGlobalMap();
    const wmsOptions = {
      url: 'http://139.224.204.129:8086/geoserver/ChangZhouYS',
      layerName: 'WMS_Layer',
      layers: 'ChangZhouYS:a_river',
      filter: [`grade=2`],
    };

    addWmsLayer(olMap, wmsOptions);

    const wmsFeatureOptions = {
      layerName: 'WMS_Layer',
      layers: 'ChangZhouYS:a_river',
    };

    // 回调函数，获取点击 WMS 瓦片图层的数据
    const getFeatureCallbackFn = (data) => {
      console.log(data, 'WMS瓦片图层数据');
    };

    getWmsFeature(olMap, wmsFeatureOptions, getFeatureCallbackFn);
  }

  onMounted(async () => {
    const menuList = await getMenuList();
    console.log(menuList, 'menuList');
    addMapData();
  });
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .homePage {
    width: 100%;
    height: 100%;
  }
</style>
