import type { ProjectConfig, MenuSetting } from '#/config';

import { defineStore } from 'pinia';
import { pinia } from '@/internal';

import { PermissionModeEnum } from '@gui-pkg/enums';
import { resetRouter } from '@/router';
import { deepMerge } from '@gui-pkg/utils';

// menu theme enum
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

interface AppState {
  darkMode?: ThemeEnum;
  // Page loading status
  pageLoading?: boolean;
  // project config
  projectConfig: ProjectConfig | null;
}

let timeId: TimeoutHandle;
// 系统默认配置，修改默认参数需要清除浏览器缓存
export const defaultConfig: ProjectConfig = {
  // 权限模式，默认前端角色权限模式
  // ROUTE_MAPPING: 前端模式（菜单由路由生成，默认）
  // ROLE：前端模式（菜单路由分开）
  // BACK: 后台模式，动态获取
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  menuSetting: {
    collapsed: false,
    split: true,
  },
};

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: defaultConfig,
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading as boolean;
    },
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || 'light';
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
    },
    async resetAllState() {
      resetRouter();
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(pinia);
}
