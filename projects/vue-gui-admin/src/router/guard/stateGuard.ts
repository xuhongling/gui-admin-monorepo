import type { Router } from 'vue-router';
import { useAppStore } from '@/store/modules/app';
// import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { useUserStore } from '@/store/modules/user';
import { usePermissionStore } from '@/store/modules/permission';
import { PageEnum } from '@/setting';
import { removeTabChangeListener } from './routeChange';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    if (to.path === PageEnum.BASE_LOGIN) {
      // const tabStore = useMultipleTabStore();
      const userStore = useUserStore();
      const appStore = useAppStore();
      const permissionStore = usePermissionStore();
      appStore.resetAllState();
      permissionStore.resetState();
      userStore.resetToken();
      removeTabChangeListener();
    }
  });
}
