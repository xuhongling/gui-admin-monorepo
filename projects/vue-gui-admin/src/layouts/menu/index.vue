<template>
  <div class="layout-menu">
    <a-menu
      v-model:selected-keys="state.selectedKeys"
      :open-keys="state.openKeys"
      mode="horizontal"
      :collapsed="props.collapsed"
      collapsible
      @click="clickMenuItem"
    >
      <MenuItem v-for="item in menusRef" :key="item.path" :menuInfo="item" />
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { PageEnum } from '@gui-pkg/enums';
  import MenuItem from './menuItem.vue';
  import { getMenus } from '@/router/menus';
  import { usePermissionStoreWithOut } from '@/store/modules/permission';
  import { useGo } from '@/hooks/web/usePage';
  import { openWindow, isUrl } from '@gui-pkg/utils';
  import { useMenuSetting } from '@/hooks/setting/useAppSetting';

  const go = useGo();
  const { getSplit } = useMenuSetting();
  // Menu array
  const menusRef = ref<Menu[]>([]);

  // 当前路由
  const currentRoute = useRoute();
  const router = useRouter();
  const permissionStore = usePermissionStoreWithOut();

  const props = defineProps({
    collapsed: { type: Boolean },
  });

  const state = reactive({
    defaultSelectedKeys: [] as string[],
    openKeys: [] as string[],
    selectedKeys: [currentRoute.path] as string[],
    collapsedOpenKeys: [] as string[],
  });

  async function genMenus() {
    menusRef.value = await getMenus();
    return;
  }

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
      if (currentRoute.name === PageEnum.BASE_LOGIN) return;
      state.openKeys = getOpenKeys();
      const meta = currentRoute.meta;
      if (meta?.activeMenu) {
        const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu);
        state.selectedKeys = [targetMenu?.path ?? meta?.activeMenu] as string[];
      } else {
        state.selectedKeys = [currentRoute.meta?.activeMenu ?? currentRoute.path] as string[];
        // 获取当前打开有子菜单的 selectedKeys
        if (getSplit.value) {
          let routeName = state.selectedKeys[0].split('/')[1];
          let menusData = await getMenus();
          for (let i = 0; i < menusData.length; i++) {
            let menuName = menusData[i].path.split('/')[1];
            if (routeName === menuName) {
              state.selectedKeys = [menusData[i].path];
            }
          }
        }
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
      background: var(--header-background);
      line-height: var(--header-height);
      border-bottom: none;
      user-select: none;
    }
  }
</style>
