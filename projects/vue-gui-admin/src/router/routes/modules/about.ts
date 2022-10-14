import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';

const about: AppRouteModule = {
  path: '/about',
  name: 'about',
  component: LAYOUT,
  redirect: '/about/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:read-outlined',
    title: '关于',
    orderNo: 1000,
  },
  children: [
    {
      path: 'index',
      name: 'about',
      component: () => import('@/views/about/index.vue'),
      meta: {
        title: '关于',
        icon: 'ant-design:read-outlined',
        hideMenu: true,
      },
    },
  ],
};

export default about;
