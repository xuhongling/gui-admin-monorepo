<template>
  <div class="layout-menu">
    <a-menu
      v-model:selected-keys="state.selectedKeys"
      :open-keys="menuState.openNames"
      :subMenuOpenDelay="0.2"
      :mode="menuState.mode"
      :theme="menuState.theme"
      :inlineCollapsed="menuState.collapsed"
      @click="clickMenuItem"
    >
      <MenuItem v-for="item in splitMenusRef" :key="item.path" :menuInfo="item" />
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch, unref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { PageEnum } from '@/setting';
  import MenuItem from './subMenuItem.vue';
  import { useThrottleFn } from '@vueuse/core';
  import { getChildrenMenus, getCurrentParentPath, getMenus } from '@/router/menus';
  import { usePermissionStoreWithOut } from '@/store/modules/permission';
  import { useGo } from '@/hooks/web/usePage';
  import { openWindow, isUrl } from '@gui-pkg/utils';
  import { useMenuSetting } from '@/hooks/setting/useAppSetting';

  import { useOpenKeys } from './useOpenKeys';

  const go = useGo();
  const { setMenuSetting } = useMenuSetting();
  // Menu array
  const menusRef = ref<Menu[]>([]);
  const splitMenusRef = ref<Menu[]>([]);

  // 当前路由
  const currentRoute = useRoute();
  const router = useRouter();
  const permissionStore = usePermissionStoreWithOut();

  const throttleHandleSplitLeftMenu = useThrottleFn(handleSplitLeftMenu, 50);

  const state = reactive({
    defaultSelectedKeys: [] as string[],
    openKeys: [] as string[],
    selectedKeys: [currentRoute.path] as string[],
    collapsedOpenKeys: [] as string[],
  });

  const menuState = reactive<MenuState>({
    mode: 'inline', // 菜单类型，现在支持垂直、水平、和内嵌模式三种 vertical | horizontal | inline
    theme: 'light', // 菜单主题  light | dark
    collapsed: false, // 菜单折叠状态
    activeName: '',
    openNames: [],
    activeSubMenuNames: [],
  });

  watch(
    () => unref(currentRoute).path,
    async (path) => {
      const { meta } = unref(currentRoute);
      const currentActiveMenu = meta.currentActiveMenu as string;
      let parentPath = await getCurrentParentPath(path);
      if (!parentPath) {
        parentPath = await getCurrentParentPath(currentActiveMenu);
      }
      parentPath && throttleHandleSplitLeftMenu(parentPath);
    },
    {
      immediate: true,
    }
  );

  // 处理左边栏子菜单的拆分
  async function handleSplitLeftMenu(parentPath: string) {
    // spilt mode left
    const children = await getChildrenMenus(parentPath);
    if (!children || !children.length) {
      splitMenusRef.value = [];
      setMenuSetting({ collapsed: false });
      return;
    }
    splitMenusRef.value = children;
    setMenuSetting({ collapsed: true });
  }

  async function genMenus() {
    menusRef.value = await getMenus();
    return;
  }

  watch(
    () => unref(currentRoute).path,
    async ([path]) => {
      // if (unref(splitNotLeft) || unref(getIsMobile)) return;

      const { meta } = unref(currentRoute);
      const currentActiveMenu = meta.currentActiveMenu as string;
      let parentPath = await getCurrentParentPath(path);
      if (!parentPath) {
        parentPath = await getCurrentParentPath(currentActiveMenu);
      }
      parentPath && throttleHandleSplitLeftMenu(parentPath);
    },
    {
      immediate: true,
    }
  );

  // Menu changes
  watch(
    [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
    () => {
      genMenus();
    },
    {
      immediate: true,
    }
  );

  // 获取当前打开的子菜单
  const getOpenKeys = () => {
    const meta = currentRoute.meta;
    if (meta?.activeMenu) {
      const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu);
      return targetMenu?.meta?.namePath ?? [meta?.activeMenu];
    }

    return (
      meta?.hideMenu
        ? state?.openKeys || []
        : currentRoute.meta?.namePath ?? currentRoute.matched.slice(1).map((n) => n.name)
    ) as string[];
  };

  // 根据activeMenu获取指定的menu
  const getTargetMenuByActiveMenuName = (activeMenu: string) => {
    return router.getRoutes().find((n) => [n.name, n.path].includes(activeMenu));
  };

  // 跟随页面路由变化，切换菜单选中状态
  watch(
    () => currentRoute.fullPath,
    async () => {
      if (currentRoute.name === PageEnum.BASE_LOGIN || menuState.collapsed) return;
      state.openKeys = getOpenKeys();
      const meta = currentRoute.meta;
      let menusData = await getMenus();

      const { setOpenKeys } = useOpenKeys(menuState, menusData);
      setOpenKeys(currentRoute.path);

      if (meta?.activeMenu) {
        const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu);
        state.selectedKeys = [targetMenu?.path ?? meta?.activeMenu] as string[];
      } else {
        state.selectedKeys = [currentRoute.meta?.activeMenu ?? currentRoute.path] as string[];
      }
    },
    {
      immediate: true,
    }
  );

  // 点击菜单
  const clickMenuItem = ({ key }) => {
    if (!isUrl(key)) {
      go(key);
    } else {
      openWindow(key);
    }
    state.selectedKeys = [key];
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .layout-menu {
    width: 100%;
    height: var(--header-height);
    line-height: unset;
    overflow: auto;
    user-select: none;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    .ant-menu {
      line-height: var(--header-height);
      border-bottom: none;
      user-select: none;
    }
  }
</style>
