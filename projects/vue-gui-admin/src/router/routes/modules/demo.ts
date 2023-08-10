import type { AppRouteModule } from '@/router/types';

import { getParentLayout, LAYOUT } from '@/router/constant';

const demo: AppRouteModule = {
  path: '/demo',
  name: 'Demo',
  component: LAYOUT,
  redirect: '/demo/icon',
  meta: {
    icon: 'ion:layers-outline',
    title: '组件',
    orderNo: 100,
  },
  children: [
    {
      path: 'icon',
      name: 'IconDemo',
      component: () => import('@/views/demo/icon/index.vue'),
      meta: {
        icon: 'ion:diamond-outline',
        title: '图标',
      },
    },
    {
      path: 'countTo',
      name: 'CountToDemo',
      component: () => import('@/views/demo/countTo/index.vue'),
      meta: {
        icon: 'ion:dice-outline',
        title: '数字动画',
      },
    },
    {
      path: 'modal',
      name: 'ModalDemo',
      component: () => import('@/views/demo/modal/index.vue'),
      meta: {
        icon: 'ion:albums-outline',
        title: '弹窗扩展',
      },
    },
    {
      path: 'drawer',
      name: 'DrawerDemo',
      component: () => import('@/views/demo/drawer/index.vue'),
      meta: {
        icon: 'ion:file-tray-full-outline',
        title: '抽屉扩展',
      },
    },
    {
      path: 'form',
      name: 'FormPage',
      redirect: '/demo/form/basic',
      component: getParentLayout('FormPage'),
      meta: {
        icon: 'ion:library-outline',
        title: 'Form',
      },
      children: [
        {
          path: 'basic',
          name: 'FormBasicPage',
          component: () => import('@/views/demo/form/index.vue'),
          meta: {
            title: '基础表单',
          },
        },
        {
          path: 'useForm',
          name: 'UseFormDemo',
          component: () => import('@/views/demo/form/UseForm.vue'),
          meta: {
            title: 'useForm',
          },
        },
        {
          path: 'refForm',
          name: 'RefFormDemo',
          component: () => import('@/views/demo/form/RefForm.vue'),
          meta: {
            title: 'RefForm',
          },
        },
        {
          path: 'ruleForm',
          name: 'RuleFormDemo',
          component: () => import('@/views/demo/form/RuleForm.vue'),
          meta: {
            title: '表单验证',
          },
        },
      ],
    },
    {
      path: 'tree',
      name: 'TreeDemo',
      redirect: '/demo/tree/basic',
      component: getParentLayout('TreeDemo'),
      meta: {
        icon: 'carbon:tree-view-alt',
        title: 'Tree',
      },
      children: [
        {
          path: 'basic',
          name: 'BasicTreeDemo',
          component: () => import('@/views/demo/tree/index.vue'),
          meta: {
            title: '基础树',
          },
        },
        {
          path: 'editTree',
          name: 'EditTreeDemo',
          component: () => import('@/views/demo/tree/EditTree.vue'),
          meta: {
            title: '可搜索/工具栏',
          },
        },
        {
          path: 'actionTree',
          name: 'ActionTreeDemo',
          component: () => import('@/views/demo/tree/ActionTree.vue'),
          meta: {
            title: '函数操作示例',
          },
        },
      ],
    },
    {
      path: 'table',
      name: 'TableDemo',
      component: () => import('@/views/demo/table/index.vue'),
      meta: {
        icon: 'ant-design:table-outlined',
        title: 'Table',
      },
    },
  ],
};

export default demo;
