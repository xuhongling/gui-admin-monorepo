import '@/styles'
// Register icon sprite
import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp } from 'vue';
import { initApplication } from './init-application';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import { pinia, registerGlobalComponents } from '@/internal';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.variable.css';

async function bootstrap() {
  const app = createApp(App);

  // 解决 injection "symbol(pinia)" not found 报错信息问题
  app.use(pinia);

  // ! Need to pay attention to the timing of execution
  // ! 需要注意调用时机
  await initApplication();

  // Register global components
  registerGlobalComponents(app);

  // 注册Antd全局组件
  app.use(Antd);

  // 配置路由
  setupRouter(app);

  // 路由守卫
  setupRouterGuard(router);

  app.mount('#app');
}
void bootstrap();
