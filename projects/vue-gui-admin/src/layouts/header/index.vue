<template>
  <Layout.Header class="layout-header">
    <div class="layout-header-logo" @click="goHome">
      <img src="../../assets/logo.png" alt="" />
      <h2 class="ml-2 truncate md:opacity-100 title">{{ projectName }}</h2>
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
  import { useGo } from '@gui-pkg/hooks';
  import { PageEnum } from '@gui-pkg/enums';
  import { useUserStoreWithOut } from '@/store/user';
  import { Layout } from 'ant-design-vue';
  import { UserDropDown } from './components';
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
    height: @header-height;
    padding: 0 20px;
    background: #fff;
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
        width: 40px;
        height: 40px;
      }
      h2.title {
        font-size: 20px;
        margin: 0px 0px 0px 8px;
        // color: @primary-color;
        background: linear-gradient(178.26deg, #03D2FF 18.82%, #037AFF 98.52%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
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
