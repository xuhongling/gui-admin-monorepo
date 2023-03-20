import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    icon: 'ion:settings-outline',
    title: '系统管理',
    orderNo: 100,
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: '账号管理',
        icon: 'ant-design:user-outlined',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/account/index.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: '角色管理',
        icon: 'ant-design:usergroup-add-outlined',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/role/index.vue'),
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: '菜单管理',
        icon: 'ant-design:appstore-outlined',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/menu/index.vue'),
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: '部门管理',
        icon: 'ant-design:apartment-outlined',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/dept/index.vue'),
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: '修改密码',
        icon: 'ant-design:file-protect-outlined',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/password/index.vue'),
    },
  ],
};

export default system;
