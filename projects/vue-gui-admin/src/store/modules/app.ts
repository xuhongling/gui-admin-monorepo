import type { ProjectConfig, MenuSetting, MultiTabsSetting } from '@gui-pkg/types';
import { defineStore } from 'pinia';
import { pinia } from '@/store';
import { resetRouter } from '@/router';
import { deepMerge } from '@gui-pkg/utils';
import { defaultConfig } from '@/setting';

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
    getDarkMode(): string {
      return this.darkMode || 'light';
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
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
