// 全局地图组件
import { withInstall } from '@gui-pkg/utils';
import globalMap from './src/index.vue';

export const GlobalMap = withInstall(globalMap);
export { initBasicMap, getGlobalMap } from './src/olMap';
