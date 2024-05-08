/*
 * @Author: xuhongling
 * @Date:   2022-11-12 10:37:34
 * @Last Modified by:   xuhongling
 * @Last Modified time: 2024-05-08 14:27:06
 */
import { ref, unref, nextTick } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer } from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import * as olInteraction from 'ol/interaction';

// 地图对象
const globalMap = ref(null);

// 初始化地图
const initBasicMap = async (target) => {
  await nextTick();
  const wrapEl: any = unref(target);
  if (!wrapEl) {
    return;
  }

  // 影像图
  const tileLayer = new TileLayer({
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
    }),
    visible: true,
  });

  const olMap: any = new Map({
    target: wrapEl,
    layers: [tileLayer],
    view: new View({
      center: [114.411, 30.507],
      zoom: 8,
      minZoom: 5,
      maxZoom: 18,
      projection: 'EPSG:4326',
    }),
  });

  // 储存地图对象
  globalMap.value = olMap;

  // Openlayers 禁用鼠标双击缩放事件
  const dblClickInteraction = olMap
    .getInteractions()
    .getArray()
    .find((interaction: any) => {
      return interaction instanceof olInteraction.DoubleClickZoom;
    });
  olMap.removeInteraction(dblClickInteraction);

  // olMap.updateSize(); // openlayers 第一次加载黑屏修复，重新加载地图

  // 地图鼠标经过小手样式
  olMap.on('pointermove', (event: any) => {
    const pixel = event.map.getEventPixel(event.originalEvent);
    const feature = event.map.forEachFeatureAtPixel(pixel, (feature: any) => {
      return feature.getProperties();
    });
    if (feature === undefined) {
      event.map.getTargetElement().style.cursor = 'auto';
    } else {
      event.map.getTargetElement().style.cursor = 'pointer';
    }
  });
};

// 返回地图对象，供调用的组件使用
const getGlobalMap = () => {
  return globalMap.value;
}

const clearGlobalMap = () => {
  globalMap.value = null;
}

export {
  initBasicMap,
  getGlobalMap,
  clearGlobalMap
}
