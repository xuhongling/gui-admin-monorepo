import { request } from '@gui-pkg/request';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';

enum Api {
  DEMO_LIST = '/basic-api/table/getDemoList',
}


const requestOptions = {
  joinPrefix: false,
  joinParamsToUrl: false,
  withToken: false,
};

/**
 * @description: Get sample list value
 */
export const demoListApi = (params: DemoParams) => {
  return request.get<DemoListGetResultModel>({ url: Api.DEMO_LIST, params }, requestOptions);
};
