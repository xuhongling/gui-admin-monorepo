import { request } from '@gui-pkg/request';

// 本地地图GeoJson数据，去除请求的一些参数
const requestOptions = {
  joinParamsToUrl: false,
  withToken: false,
  joinTime: false,
  joinPrefix: false,
  isTransformResponse: false,
};

// 湖北省边界
export function getBoundaryJson(adcode = 420000) {
  return request.get({ url: `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode}_full` }, requestOptions);
}
