/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export type SubsystemParams = BasicPageParams & {
  sysName: string;
  meta?: object;
  orderNum?: number;
  platformSysId?: string;
  status: number;
  sysCode: string;
  sysColor?: string;
  sysIcon?: string;
  remark?: string;
};

export interface SubsystemListItem {
  sysName: string;
  meta: object;
  orderNum: number;
  platformSysId: string;
  status: number;
  sysCode: string;
  sysColor?: string;
  sysIcon?: string;
  remark?: string;
}

/**
 * @description: Request list return value
 */
export type SubsystemListGetResultModel = BasicFetchResult<SubsystemListItem>;
