<template>
  <Layout.Header class="layout-header">
    <div class="layout-header-logo" @click="goHome">
      <img src="../../assets/logo.png" alt="" />
      <h2 class="ml-1 truncate md:opacity-100 title">{{ projectName }}</h2>
    </div>
    <div class="layout-header-menu">
      <LayoutMenu :collapsed="props.collapsed" />
    </div>
    <!-- action  -->
    <div class="layout-header-action">
      <UserDropDown />
    </div>
  </Layout.Header>
</template>

<script lang="ts" setup>
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/setting';
  import { useUserStoreWithOut } from '@/store/modules/user';
  import { Layout } from 'ant-design-vue';
  import UserDropDown from './user-dropdown/index.vue'
  import LayoutMenu from '../menu/index.vue';

  const projectName = import.meta.env.VITE_GLOB_APP_TITLE;

  const userStore = useUserStoreWithOut();
  const go = useGo();

  const props = defineProps({
    collapsed: { type: Boolean },
  });

  function goHome() {
    go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .layout-header {
    width: 100%;
    height: var(--header-height);
    padding: 0 20px;
    background: var(--header-background);
    box-shadow: 0px 2px 10px 0px rgba(115, 115, 115, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    &-logo {
      width: 300px;
      display: flex;
      align-items: center;
      cursor: pointer;
      img {
        width: 32px;
      }
      h2.title {
        font-size: 18px;
        color: var(--primary-color);
        font-weight: bold;
      }
    }
    &-menu {
      display: flex;
      align-items: center;
      flex: 1;
      height: 100%;
      min-width: 0;
    }
    &-action {
      display: flex;
      min-width: 120px;
      align-items: center;
      margin-left: 10px;
    }
  }
</style>
