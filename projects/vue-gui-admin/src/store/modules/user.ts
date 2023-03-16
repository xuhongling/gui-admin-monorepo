import type { UserInfo } from '@gui-pkg/types';
import { isArray } from '@gui-pkg/utils';
import { PageEnum, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@gui-pkg/enums';
import { defineStore } from 'pinia';
import { pinia } from '@/store';
import { router } from '@/router';
import { resetRouter } from '@/router';
import { loginApi } from '@/api/system/user';
import { GetUserInfoModel, LoginParams } from '@/api/system/model/userModel';
import { useMessage } from '@/hooks/web/useMessage';
import { usePermissionStore } from '@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';
import { useWebStorage } from '@/hooks/web/useWebStorage';
import { h } from 'vue';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: string[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

const { getWebStorage, setWebStorage, clearAllWebStorage } = useWebStorage();

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getWebStorage<UserInfo>(USER_INFO_KEY) || ({} as UserInfo);
    },
    getToken(): string {
      return this.token as string || getWebStorage<string>(TOKEN_KEY);
    },
    getRoleList(): string[] {
      return this.roleList.length > 0 ? this.roleList : getWebStorage<string[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    /**登录成功保存token */
    setToken(token: string) {
      this.token = token ? token : '';
      const ex = 7 * 24 * 60 * 60 * 1000;
      setWebStorage(TOKEN_KEY, this.token, ex);
    },
    setRoleList(roleList: string[]) {
      this.roleList = roleList;
      setWebStorage(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setWebStorage(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    /**清空token及用户信息 */
    resetToken() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
      clearAllWebStorage();
    },
    /**登录 */
    async login(
      params: LoginParams & {
        goHome?: boolean;
      }
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, ...loginParams } = params;
        console.log(loginParams, 'loginParams');
        // 登录接口，根据项目自定
        /*const data2 = await loginApi(loginParams);
        console.log(data2, 'data2data2data2');*/
        const data = {
          token:
            'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiMywtMSwxNTMyMTc5NjI2MTQ1NjE1ODczIiwibW9iaWxlIjoiMTc2MjE2Mzc5MTIiLCJleHAiOjE2NTgzOTU2NjgsInVzZXJJZCI6IjEiLCJpYXQiOjE2NTgzOTIwNjgsInJlYWxuYW1lIjoi6LaF57qn566h55CG5ZGYIiwidXNlcm5hbWUiOiJhZG1pbiJ9.aQIkethHjfkeeQsInoDfxCsKOFfJENlFht7imf9ImUQ',
          roles: [{ roleId: '-1', roleName: '超级管理员', roleCode: '0001' }],
          userId: '1',
          username: 'admin',
          realname: '超级管理员',
          avatar: null,
        };
        const { token } = data;

        // 储蓄登录返回的用户信息
        window.localStorage.setItem('LOGIN_USER_INFO_KEY', JSON.stringify(data));

        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**登录成功之后, 获取用户信息以及生成权限路由 */
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();
      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      // const userInfo = await getUserInfo();
      // 登录获取的用户信息
      const LOGIN_USER_INFO_KEY: any = window.localStorage.getItem('LOGIN_USER_INFO_KEY');
      const data = JSON.parse(LOGIN_USER_INFO_KEY);
      const userInfo = {
        roles: data?.roles,
        userId: data?.userId,
        username: data?.username,
        realName: data?.realname,
        avatar: data?.avatar,
      };

      const { roles = [] } = userInfo;
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value) as string[];
        this.setRoleList(roleList);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    /**退出登录 */
    async logout(goLogin = false) {
      this.resetToken();
      resetRouter();
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
    /**注销前确认 */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', '温馨提醒'),
        content: () => h('span', '是否确认退出系统'),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(pinia);
}
