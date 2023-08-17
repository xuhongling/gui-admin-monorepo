<template>
  <Layout class="layout">
    <LayoutHeader :collapsed="collapsed" />
    <Layout>
      <Layout.Sider
        v-model:collapsed="collapsed"
        :width="asiderWidth"
        collapsible
        class="layout-sider"
        theme="light"
        v-if="getSplit"
        v-show="getCollapsed"
      >
        <LayoutSideBar />
      </Layout.Sider>
      <Layout.Content class="layout-content">
        <MultipleTabs />
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Layout } from 'ant-design-vue';
  import LayoutHeader from './header/index.vue';
  import LayoutSideBar from './sider/index.vue';
  import MultipleTabs from './tabs/index.vue';
  import { useMenuSetting } from '@/hooks/setting/useAppSetting';

  const { getCollapsed, getSplit } = useMenuSetting();
  const collapsed = ref<boolean>(false);

  // 自定义侧边栏菜单收缩和展开时的宽度
  const asiderWidth = computed(() => (collapsed.value ? 80 : 220));
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .layout {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .ant-layout {
      min-height: 100%;
      overflow: hidden;
    }

    .layout-content {
      flex: 1;
    }

    ::v-deep(.ant-layout-sider-light .ant-layout-sider-trigger) {
      border-top: 1px solid #eee;
      height: 36px;
      line-height: 36px;
    }
  }
</style>
