import { request } from '@gui-pkg/request';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/basic-api/getMenuList',
}

const requestOptions = {
  /*joinPrefix: false,
  joinParamsToUrl: false,
  withToken: false,*/
  ignoreCancelToken: true,
};


/**
 * @description: Get user menu based on id
 */
export const getMenuList = () => {
  return request.get<getMenuListResultModel>({ url: Api.GetMenuList }, requestOptions);
};
