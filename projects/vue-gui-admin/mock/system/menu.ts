import {resultSuccess, resultError, getRequestToken, requestParams, } from '../_mock-util'
import { MockMethod } from 'vite-plugin-mock'
import { createFakeUserList } from './auth'

// single
const backRoute = {
  path: 'back',
  name: 'PermissionBackDemo',
  meta: {
    title: 'routes.demo.permission.back',
  },

  children: [
    {
      path: 'page',
      name: 'BackAuthPage',
      component: '/demo/permission/back/index',
      meta: {
        title: 'routes.demo.permission.backPage',
      },
    },
    {
      path: 'btn',
      name: 'BackAuthBtn',
      component: '/demo/permission/back/Btn',
      meta: {
        title: 'routes.demo.permission.backBtn',
      },
    },
  ],
}

const authRoute = {
  path: '/permission',
  name: 'Permission',
  component: 'LAYOUT',
  redirect: '/permission/front/page',
  meta: {
    icon: 'carbon:user-role',
    title: 'routes.demo.permission.permission',
  },
  children: [backRoute],
}

const homeRoute = {
  path: '/home',
  name: 'HomePage',
  component: 'LAYOUT',
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
      component: '/home/index.vue',
      meta: {
        title: '首页',
        hideMenu: true,
      },
    },
  ],
};

const dashboardRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  component: 'LAYOUT',
  redirect: '/dashboard/analysis',
  meta: {
    icon: 'ion:grid-outline',
    title: 'Dashboard',
    orderNo: 100,
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: '/dashboard/analysis/index.vue',
      meta: {
        icon: 'ion:home-outline',
        title: '分析页',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: '/dashboard/workbench/index.vue',
      meta: {
        icon: 'ion:home-outline',
        title: '工作台',
      },
    },
  ],
};

const aboutRoute = {
  path: '/about',
  name: 'about',
  component: 'LAYOUT',
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
      component: '/about/index.vue',
      meta: {
        title: '关于',
        icon: 'ant-design:read-outlined',
        hideMenu: true,
      },
    },
  ],
};

const sysRoute = {
  path: '/system',
  name: 'System',
  component: 'LAYOUT',
  redirect: '/system/account',
  meta: {
    icon: 'ion:settings-outline',
    title: '系统管理',
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
      component: '/system/account/index',
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: '角色管理',
        icon: 'ant-design:usergroup-add-outlined',
        ignoreKeepAlive: true,
      },
      component: '/system/role/index',
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: '菜单管理',
        icon: 'ant-design:appstore-outlined',
        ignoreKeepAlive: true,
      },
      component: '/system/menu/index',
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: '部门管理',
        icon: 'ant-design:apartment-outlined',
        ignoreKeepAlive: true,
      },
      component: '/system/dept/index',
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: '修改密码',
        icon: 'ant-design:file-protect-outlined',
        ignoreKeepAlive: true,
      },
      component: '/system/password/index',
    },
  ],
}


export default [
  {
    url: '/basic-api/getMenuList',
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      /*const token = getRequestToken(request)
      if (!token) {
        return resultError('Invalid token!')
      }
      const checkUser = createFakeUserList().find(
        (item) => item.token === token,
      )
      if (!checkUser) {
        return resultError('Invalid user token!')
      }
      const id = checkUser.userId
      let menu: Object[]
      switch (id) {
        case '1':
          dashboardRoute.redirect =
            dashboardRoute.path + '/' + dashboardRoute.children[0].path
          menu = [homeRoute, dashboardRoute, aboutRoute, sysRoute]
          break
        case '2':
          dashboardRoute.redirect =
            dashboardRoute.path + '/' + dashboardRoute.children[1].path
          menu = [homeRoute, dashboardRoute, aboutRoute]
          break
        default:
          menu = []
      }*/

      console.log(request);
      const menu = [homeRoute, dashboardRoute, aboutRoute, sysRoute]

      return resultSuccess(menu)
    },
  },
] as MockMethod[]
