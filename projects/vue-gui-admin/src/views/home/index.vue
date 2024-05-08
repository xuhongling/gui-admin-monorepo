<template>
  <div class="homePage">
    <GlobalMap />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { getMenuList } from '@/api/system/menu';
  import { GlobalMap, getGlobalMap } from '@/components/global-map';
  import { addPolygonLayer } from 'gmap-ol';
  import { Vector as VectorLayer } from 'ol/layer';
  import { Vector as VectorSource } from 'ol/source';
  import { Polygon } from 'ol/geom';
  import { Fill, Style } from 'ol/style';
  import Feature from 'ol/Feature';
  import { GeoJSON } from 'ol/format';
  import { getBoundaryJson } from '@/api/mapServices/geojson';

  // 地图遮罩层示例
  const addMaskLayerData = async () => {
    const boundaryJson = await getBoundaryJson('420100');
    const olMap = await getGlobalMap();
    const geojsonFormat = new GeoJSON();
    const features = geojsonFormat.readFeatures(boundaryJson);
    const center = boundaryJson.features[0].properties.center;

      // 创建一个遮罩层
    const mask = new Polygon([[
      [-10.46527138, 73.48800655 ], [-10.46527138, -31.653669724 ], [211.67602760, -31.653669724 ], [211.67602760, 73.48800655 ], [-10.46527138, 73.48800655 ]
    ]]);

    // 从遮罩层中减去你的边界数据
    features.forEach((feature) => {
      const geometry: any = feature.getGeometry();
      for (let i = 0; i < geometry.getPolygons().length; i++) {
        const polygon = geometry.getPolygon(i);
        mask.appendLinearRing(polygon.getLinearRing(0));
      }
    });

    // 创建一个VectorLayer，并将遮罩层添加到其中
    const maskLayer = new VectorLayer({
      source: new VectorSource({
        features: [new Feature(mask)]
      }),
      style: new Style({
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0.5)'
        }),
      })
    });

    olMap.addLayer(maskLayer);

    olMap.getView().animate({
      center: center,   //平移到点，有缓动效果
      duration: 1000,   //动画时间
      zoom: 9.5    //设置地图视图层级大小
    });

    const polygonOptions = {
      layerName: 'PolygonLayer',
      zIndex: 10,
      textFieldName: 'name',
      styles: {
        stroke: {
          width: 2,
          color: 'rgba(198, 187, 79, 0.8)',  // rgba(185, 171, 120, 1)
          lineDash: [10, 10]
        },
        text: {
          fill: {
            color: 'rgba(255, 0, 0, 0.4)',
          },
          stroke: {
            width: 2,
            color: 'rgba(255, 255, 255, 0.5)',
          },
          font: 'italic small-caps bold 10px sans-serif',
        },
      }
    };
    // 把数据加载在地图上
    addPolygonLayer(olMap, boundaryJson, polygonOptions);
  }

  onMounted(async () => {
    const menuList = await getMenuList();
    console.log(menuList, 'menuList');
    addMaskLayerData();
  });
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .homePage {
    width: 100%;
    height: 100%;
  }
</style>
