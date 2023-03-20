<template>
  <div class="icon-demo">
    <a-page-header title="Icon组件示例" />
    <a-card title="Antv Icon使用 (直接按需引入相应组件即可)" class="mb-5">
      <div class="flex justify-around">
        <GithubFilled :style="{ fontSize: '30px' }" />
        <QqCircleFilled :style="{ fontSize: '30px' }" />
        <WechatFilled :style="{ fontSize: '30px' }" />
        <AlipayCircleFilled :style="{ fontSize: '30px' }" />
        <IeCircleFilled :style="{ fontSize: '30px' }" />
        <TaobaoCircleFilled :style="{ fontSize: '30px' }" />
        <CodepenCircleFilled :style="{ fontSize: '30px' }" />
      </div>
    </a-card>

    <a-card title="IconIfy 组件使用" class="mb-5">
      <div class="flex justify-around flex-wrap">
        <Icon icon="ion:layers-outline" :size="30" />
        <Icon icon="ion:bar-chart-outline" :size="30" />
        <Icon icon="ion:tv-outline" :size="30" />
        <Icon icon="ion:settings-outline" :size="30" />
      </div>
    </a-card>

    <Alert
      show-icon
      message="推荐使用Iconify组件"
      description="Icon组件基本包含所有的图标,在下面网址内你可以查询到你想要的任何图标。并且打包只会打包所用到的图标。"
    />
    <a-button type="link" @click="toIconify"> Iconify 图标大全 </a-button>
  </div>
</template>

<script lang="ts" setup>
  import { Alert } from 'ant-design-vue';
  import { Icon } from '@gui-pkg/components';
  import { openWindow } from '@gui-pkg/utils';
  import { QqCircleFilled, GithubFilled, WechatFilled, AlipayCircleFilled, IeCircleFilled, TaobaoCircleFilled, CodepenCircleFilled } from '@ant-design/icons-vue';

  const toIconify = () => {
    openWindow('https://icon-sets.iconify.design/?query=');
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .icon-demo {
    width: 100%;
    height: 100%;
    padding: 16px;
  }
</style>
