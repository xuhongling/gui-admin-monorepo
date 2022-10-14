import { request } from '@gui-pkg/request';
import { MenuParams, getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/platform/sys/menu/tree',
}

/**
 * @description: Get user menu based on id
 */
export const getMenuList = (params?: MenuParams) => {
  return request.post<getMenuListResultModel>({ url: Api.GetMenuList, params });
};
