import { request } from '@gui-pkg/request';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

enum Api {
  Login = '/thinkwater/api/system/login',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
}

const requestOptions = {
  withToken: false,
  joinTime: false,
};

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams) {
  return request.post<LoginResultModel>({url: Api.Login, params }, requestOptions);
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return request.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}

export function getPermCode() {
  return request.get<string[]>({ url: Api.GetPermCode });
}

// 获取用户Token
export function getUserToken(userId) {
  return request.post<GetUserInfoModel>({ url: `/platform/sys/user/${userId}/token` });
}
