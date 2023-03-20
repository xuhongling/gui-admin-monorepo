<template>
  <div class="homePage">
    <GlobalMap />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { getMenuList } from '@/api/system/menu';
  import { GlobalMap, getGlobalMap } from '@/components/global-map';
  import { addLineStringLayer } from 'gmap-ol';

  const addMapData = () => {
    const olMap = getGlobalMap();
    // LineString 的 GeoJSON 数据
    const lineStringData = {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [114.411, 30.407],
            [114.409, 30.708]
          ]
        },
        "properties": {
          "name": "武汉"
        }
      }]
    };

    // lineString 的 Options
    const lineStringOptions = {
      layerName: 'LineStringLayer',
      zIndex: 10,
      textFieldName: 'name',
      styles: {
        stroke: {
          width: 3,
          color: 'rgba(255, 10, 10, 1)',
        },
      },
    };

    // 把数据加载在地图上
    addLineStringLayer(olMap, lineStringData, lineStringOptions);
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
