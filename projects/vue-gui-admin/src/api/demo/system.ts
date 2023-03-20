import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { request } from '@gui-pkg/request';

enum Api {
  AccountList = '/basic-api/system/getAccountList',
  IsAccountExist = '/basic-api/system/accountExist',
  DeptList = '/basic-api/system/getDeptList',
  setRoleStatus = '/basic-api/system/setRoleStatus',
  MenuList = '/basic-api/system/getMenuList',
  RolePageList = '/basic-api/system/getRoleListByPage',
  GetAllRoleList = '/basic-api/system/getAllRoleList',
}

export const getAccountList = (params: AccountParams) =>
  request.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  request.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  request.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  request.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  request.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  request.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  request.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
