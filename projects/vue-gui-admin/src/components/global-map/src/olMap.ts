/*
 * @Author: xuhongling
 * @Date:   2022-11-12 10:37:34
 * @Last Modified by:   xuhongling
 * @Last Modified time: 2022-11-12 14:05:08
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
export function initBasicMap(target) {
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

  nextTick(() => {
    // openlayers 第一次加载黑屏修复，重新加载地图
    setTimeout(() => {
      olMap.updateSize();
    }, 40);
  });

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
export function getGlobalMap() {
  return globalMap.value;
}
