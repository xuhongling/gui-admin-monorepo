import { request } from '@gui-pkg/request';
import { AreaModel, AreaParams } from '/@/api/demo/model/areaModel';

enum Api {
  AREA_RECORD = '/basic-api/cascader/getAreaRecord',
}

export const areaRecord = (data: AreaParams) =>
  request.post<AreaModel>({ url: Api.AREA_RECORD, data });
