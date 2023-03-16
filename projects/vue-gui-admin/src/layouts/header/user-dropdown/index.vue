<template>
  <Dropdown placement="bottomLeft" overlayClassName="header-user-dropdown-dropdown-overlay">
    <h3 class="header-user-dropdown">
      <img class="header-user-dropdown__header" :src="getUserInfo.avatar" />
      <span class="header-user-dropdown__name">
        {{ getUserInfo.realname }}
      </span>
    </h3>

    <template #overlay>
      <Menu>
        <MenuItem key="logout" text="退出登录" icon="ion:power-outline" @click="handleLoginOut" />
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Dropdown, Menu } from 'ant-design-vue';
  import { useUserStoreWithOut } from '@/store/modules/user';
  import MenuItem from './DropMenuItem.vue';

  import headerImg from '@/assets/images/user.jpg';

  const userStore = useUserStoreWithOut();
  const getUserInfo = computed(() => {
    const { realname = '超级管理员', avatar } = userStore.getUserInfo || {};
    return { realname, avatar: avatar || headerImg };
  });

  //  login out
  function handleLoginOut() {
    userStore.confirmLoginOut();
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .header-user-dropdown {
    height: 100%;
    padding: 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
      color: #333;
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 140px;
      }
    }
  }
</style>
