import '@gui-pkg/styles'
// Register icon sprite
import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp } from 'vue';
import { initApplication } from './init-application';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import Antd from 'ant-design-vue';
import { pinia } from '@/store';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import 'ant-design-vue/dist/antd.less';

async function bootstrap() {
  const app = createApp(App);

  // 解决 injection "symbol(pinia)" not found 报错信息问题
  app.use(pinia);

  // ! Need to pay attention to the timing of execution
  // ! 需要注意调用时机
  await initApplication();

  // 全局完整注册 Antd 组件
  app.use(Antd)

  // 配置路由
  setupRouter(app);

  // 路由守卫
  setupRouterGuard(router);

  // initGuiComponent(app);
  //注册自定义组件
  app.use(VXETable)

  app.mount('#app');

  // When closing MOCK, Tree Shaking `mockjs` dep
  // 在关闭 MOCK 的时候, Tree Shaking `mockjs` 依赖
  if (__VITE_USE_MOCK__) {
    import('../mock/_mock-server').then(({ setupProdMockServer }) =>
      setupProdMockServer(),
    )
  }
}
void bootstrap();
