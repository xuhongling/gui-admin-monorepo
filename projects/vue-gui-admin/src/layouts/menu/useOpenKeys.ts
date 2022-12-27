import type { Menu as MenuType } from '@/router/types';

import { computed, toRaw } from 'vue';
import { getAllParentPath } from '@/router/helper/menuHelper';

import { useTimeoutFn } from '@gui-pkg/hooks';
import { useDebounceFn } from '@vueuse/core';


interface MenuState {
  activeName: string;
  openNames: string[];
  activeSubMenuNames: string[];
}

export function useOpenKeys(menuState: MenuState, menus: MenuType[]) {
  const debounceSetOpenKeys = useDebounceFn(setOpenKeys, 50);

  async function setOpenKeys(path: string) {
    const menuList = toRaw(menus);
    useTimeoutFn(() => {
      if (menuList?.length === 0) {
        menuState.activeSubMenuNames = [];
        menuState.openNames = [];
        return;
      }
      const keys = getAllParentPath(menuList, path);
      menuState.openNames = keys;
      menuState.activeSubMenuNames = menuState.openNames;
    }, 30);
  }

  const getOpenKeys = computed(() => {
    return menuState.openNames;
  });

  return { setOpenKeys: debounceSetOpenKeys, getOpenKeys };
}
