import type { MenuSetting, ProjectConfig, MultiTabsSetting } from '@gui-pkg/types';
import { computed } from 'vue';
import { useAppStore, ThemeEnum } from '@/store/modules/app';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>

// 项目配置
export function useRootSetting() {
  const appStore = useAppStore();

  const getDarkMode = computed(() => appStore.getDarkMode);

  const getPermissionMode = computed(() => appStore.getProjectConfig.permissionMode);

  function setRootSetting(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting)
  }

  function setDarkMode(mode: ThemeEnum) {
    appStore.setDarkMode(mode);
  }


  return {
    setRootSetting,
    setDarkMode,
    getDarkMode,
    getPermissionMode,
  };
}

// 菜单配置
export function useMenuSetting() {
  const appStore = useAppStore();

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);
  const getSplit = computed(() => appStore.getMenuSetting.split);

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  return {
    getCollapsed,
    getSplit,
    setMenuSetting,
  };
}

// 多标签页配置
export function useMultipleTabSetting() {
  const appStore = useAppStore();

  const getShowMultipleTab = computed(() => appStore.getMultiTabsSetting.show);

  // Set multipleTabSetting configuration
  function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>): void {
    appStore.setProjectConfig({ multiTabsSetting });
  }

  return {
    getShowMultipleTab,
    setMultipleTabSetting,
  };
}
