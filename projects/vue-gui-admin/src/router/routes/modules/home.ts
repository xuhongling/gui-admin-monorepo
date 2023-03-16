import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const home: AppRouteModule = {
  path: '/home',
  name: 'HomePage',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:home-outlined',
    title: '首页',
    orderNo: 10,
  },
  children: [
    {
      path: 'index',
      name: 'HomePage',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '首页',
        hideMenu: true,
      },
    },
  ],
};

export default home;
