<template>
  <!-- 目录 -->
  <template v-if="isShowSubMenu && !getSplit">
    <a-sub-menu :key="props.menuInfo?.path" v-bind="$attrs">
      <template #title>
        <span>
          <Icon v-if="props.menuInfo?.meta?.icon" :icon="props.menuInfo?.meta?.icon" :size="18" />
          <span class="layout-menu-item-name">{{ props.menuInfo?.name }}</span>
        </span>
      </template>
      <template v-for="item in menuChildren" :key="item.path || item.fullPath">
        <!-- 递归生成菜单 -->
        <LayoutMenuItem :menu-info="item" />
      </template>
    </a-sub-menu>
  </template>
  <!-- 菜单 -->
  <template v-else>
    <a-menu-item :key="props.menuInfo?.path">
      <Icon v-if="menuInfo?.meta?.icon" :icon="menuInfo?.meta?.icon" :size="18" />
      <span class="layout-menu-item-name">{{ props.menuInfo?.name }}</span>
    </a-menu-item>
  </template>
</template>

<script lang="ts">
  import { type PropType, computed } from 'vue';
  import type { RouteRecordRaw } from 'vue-router';
  import { defineComponent } from 'vue';
  import { Icon } from '@gui-pkg/components';
  import { useMenuSetting } from '@/hooks/setting/useAppSetting';

  export default defineComponent({
    name: 'LayoutMenuItem',
    components: { Icon },
    props: {
      menuInfo: {
        type: Object as PropType<RouteRecordRaw>,
        default() {
          return {};
        },
      },
    },
    setup(props) {
      const { getSplit } = useMenuSetting();
      const menuChildren = computed(() => {
        return [...(props.menuInfo?.children || [])]
          .filter((n) => !n.meta?.hideInMenu)
          .sort((a, b) => (a?.meta?.orderNum || 0) - (b?.meta?.orderNum || 0));
      });

      const isShowSubMenu = computed(() => {
        const menuInfo = props.menuInfo;
        return (
          menuInfo?.meta?.type === 0 ||
          (!Object.is(menuInfo?.meta?.hideChildrenInMenu, true) && menuInfo?.children?.length)
        );
      });

      return { props, menuChildren, isShowSubMenu, getSplit };
    },
  });
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
