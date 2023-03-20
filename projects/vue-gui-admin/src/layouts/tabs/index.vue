<template>
  <div class="tabs-view">
    <Tabs
      :active-key="activeKey"
      hide-add
      type="editable-card"
      class="tabs"
      @change="changePage"
      @edit="editTabItem"
    >
      <Tabs.TabPane v-for="pageItem in tabsList" :key="pageItem.fullPath">
        <template #tab>
          <Dropdown :trigger="['contextmenu']">
            <div style="display: inline-block">
              {{ pageItem.meta?.title }}
            </div>
            <template #overlay>
              <Menu style="user-select: none">
                <Menu.Item key="1" :disabled="activeKey !== pageItem.fullPath" @click="reloadPage">
                  <reload-outlined />
                  <span class="ml-2">重新加载</span>
                </Menu.Item>
                <Menu.Item key="2" @click="removeTab(pageItem)">
                  <close-outlined />
                  <span class="ml-2">关闭标签页</span>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" @click="closeLeft(pageItem)">
                  <vertical-right-outlined />
                  <span class="ml-2">关闭左侧标签页</span>
                </Menu.Item>
                <Menu.Item key="4" @click="closeRight(pageItem)">
                  <vertical-left-outlined />
                  <span class="ml-2">关闭右侧标签页</span>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="5" @click="closeOther(pageItem)">
                  <column-width-outlined />
                  <span class="ml-2">关闭其它标签页</span>
                </Menu.Item>
                <Menu.Item key="6" @click="closeAll">
                  <minus-outlined />
                  <span class="ml-2">关闭全部标签页</span>
                </Menu.Item>
              </Menu>
            </template>
          </Dropdown>
        </template>
      </Tabs.TabPane>

      <template #rightExtra>
        <Dropdown :trigger="['click']" placement="bottomRight">
          <span class="ant-dropdown-link" @click.prevent>
            <Icon icon="ion:chevron-down" />
          </span>
          <template #overlay>
            <Menu style="user-select: none">
              <Menu.Item key="1" :disabled="activeKey !== route.fullPath" @click="reloadPage">
                <reload-outlined />
                <span class="ml-2">重新加载</span>
              </Menu.Item>
              <Menu.Item key="2" @click="removeTab(route)">
                <close-outlined />
                <span class="ml-2">关闭标签页</span>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="5" @click="closeOther(route)">
                <column-width-outlined />
                <span class="ml-2">关闭其它标签页</span>
              </Menu.Item>
              <Menu.Item key="6" @click="closeAll">
                <minus-outlined />
                <span class="ml-2">关闭全部标签页</span>
              </Menu.Item>
            </Menu>
          </template>
        </Dropdown>
      </template>
    </Tabs>
    <div class="tabs-view-content">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <transition
            :name="Object.is(route.meta?.transitionName, false) ? '' : 'fade-transform'"
            mode="out-in"
            appear
          >
            <keep-alive :include="keepAliveComponents">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </template>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, unref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    ReloadOutlined,
    CloseOutlined,
    VerticalRightOutlined,
    VerticalLeftOutlined,
    ColumnWidthOutlined,
    MinusOutlined,
  } from '@ant-design/icons-vue';
  import { Dropdown, Tabs, message, Menu } from 'ant-design-vue';
  import { Icon } from '@gui-pkg/components';
  import type { RouteLocation } from 'vue-router';
  import { useWebStorage } from '@/hooks/web/useWebStorage';
  import { TABS_ROUTES } from '@gui-pkg/enums';
  import { useMultipleTabWithOutStore, blackList } from '@/store/modules/multipleTab';
  import { useKeepAliveStoreWithOut } from '@/store/modules/keepAlive';
  import { REDIRECT_NAME } from '@/router/constant';

  type RouteItem = Omit<RouteLocation, 'matched' | 'redirectedFrom'>;

  const route = useRoute();
  const router = useRouter();
  const multipleTabStore = useMultipleTabWithOutStore();
  const keepAliveStore = useKeepAliveStoreWithOut();
  const { getWebStorage, setWebStorage } = useWebStorage();

  const activeKey = computed(() => multipleTabStore.getCurrentTab?.fullPath);

  // 标签页列表
  const tabsList = computed(() => multipleTabStore.getTabsList);

  // 缓存的路由组件列表
  const keepAliveComponents = computed(() => keepAliveStore.list);

  // 获取简易的路由对象
  const getSimpleRoute = (route): RouteItem => {
    const { fullPath, hash, meta, name, params, path, query } = route;
    return { fullPath, hash, meta, name, params, path, query };
  };

  let routes: RouteItem[] = [];

  try {
    const routesStr = getWebStorage(TABS_ROUTES) as string | null | undefined;
    routes = routesStr ? JSON.parse(routesStr) : [getSimpleRoute(route)];
  } catch (e) {
    routes = [getSimpleRoute(route)];
  }

  // 初始化标签页
  multipleTabStore.initTabs(routes);

  watch(
    () => route.fullPath,
    () => {
      if (blackList.some((n) => n === route.name)) return;
      multipleTabStore.addTabs(getSimpleRoute(route));
    },
    { immediate: true }
  );

  // 在页面关闭或刷新之前，保存数据
  window.addEventListener('beforeunload', () => {
    setWebStorage(TABS_ROUTES, JSON.stringify(tabsList.value));
  });

  // 目标路由是否等于当前路由
  const isCurrentRoute = (route) => {
    return router.currentRoute.value.matched.some((item) => item.name === route.name);
  };

  // 关闭当前页面
  const removeTab = (route) => {
    if (tabsList.value.length === 1) {
      return message.warning('这已经是最后一页，不能再关闭了！');
    }
    multipleTabStore.closeCurrentTab(route);
  };
  // tabs 编辑（remove || add）
  const editTabItem = (targetKey, action: string) => {
    if (action == 'remove') {
      removeTab(tabsList.value.find((item) => item.fullPath == targetKey));
    }
  };
  // 切换页面
  const changePage = (key) => {
    Object.is(route.fullPath, key) || router.push(key);
  };

  // 刷新页面
  const reloadPage = () => {
    router.replace({
      name: REDIRECT_NAME,
      params: {
        path: unref(route).fullPath,
      },
    });
  };

  // 关闭左侧
  const closeLeft = (route) => {
    multipleTabStore.closeLeftTabs(route);
    !isCurrentRoute(route) && router.replace(route.fullPath);
  };

  // 关闭右侧
  const closeRight = (route) => {
    multipleTabStore.closeRightTabs(route);
    !isCurrentRoute(route) && router.replace(route.fullPath);
  };

  // 关闭其他
  const closeOther = (route) => {
    multipleTabStore.closeOtherTabs(route);
    !isCurrentRoute(route) && router.replace(route.fullPath);
  };

  // 关闭全部
  const closeAll = () => {
    localStorage.removeItem('routes');
    multipleTabStore.closeAllTabs();
    router.replace('/');
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .tabs-view {
    border-top: 1px solid #eee;
    ::v-deep(.tabs) {
      .ant-tabs-nav {
        user-select: none;
        padding: 4px 6px 0 6px;
        height: var(--tab-bar-height);
        margin: 0;
        background-color: #fff;
        border: 0;
        box-shadow: none;
        font-size: 12px;
      }

      .ant-tabs-tabpane {
        display: none;
      }

      .ant-tabs-tab-remove {
        display: flex;
        padding: 0;
        margin: 0;
        .anticon-close {
          padding-left: 6px;
        }
      }
      .ant-tabs-tab {
        height: calc(var(--tab-bar-height) - 4px);
        padding: 2px 12px 0 14px;
        font-size: 12px;
        line-height: calc(var(--tab-bar-height) - 4px);
        color: #000000;
        background: #fff;
        .ant-tabs-tab-remove {
          width: unset;
        }
        .anticon-close {
          width: 14px;
          padding-left: 8px;
          font-size: 10px;
          visibility: hidden;
          transition: width 0.3s;
        }
        &:hover {
          .anticon-close {
            visibility: visible;
          }
          .ant-tabs-tab-remove {
            width: unset;
          }
        }
      }
      .ant-tabs-tab-active {
        position: relative;
        background: var(--primary-color);
        transition: none;
        .ant-tabs-tab-btn {
          color: #fff;
        }
        .anticon-close {
          width: 14px;
          visibility: visible;
          padding-left: 8px;
          color: #fff;
        }
        .ant-tabs-tab-remove {
          width: unset;
        }
      }
    }
    ::v-deep(.ant-dropdown) {
      .describe {
        margin-left: 10px;
      }
    }
    .ant-dropdown-link {
      display: inline-block;
      width: 36px;
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      cursor: pointer;
      &:hover {
        color: rgba(0, 0, 0, 0.85);
      }
    }

    .tabs-view-content {
      height: calc(100vh - var(--header-height) - var(--tab-bar-height));
      overflow: auto;
      position: relative;
      // padding: 16px;
    }
  }
</style>
