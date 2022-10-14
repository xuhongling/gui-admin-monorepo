import type { MenuSetting } from '#/config';

import { computed } from 'vue';
import { useAppStore, ThemeEnum } from '@/store/app';

// 项目配置
export function useRootSetting() {
  const appStore = useAppStore();

  const getDarkMode = computed(() => appStore.getDarkMode);

  function setDarkMode(mode: ThemeEnum) {
    appStore.setDarkMode(mode);
  }

  return {
    getDarkMode,
    setDarkMode,
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
