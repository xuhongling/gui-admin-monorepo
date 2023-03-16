<template>
  <ConfigProvider :locale="state.locale">
    <RouterView />
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  dayjs.locale('zh-cn');

  const state = reactive({
    locale: zhCN,
  });
</script>
