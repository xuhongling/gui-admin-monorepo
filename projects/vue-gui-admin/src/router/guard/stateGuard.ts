import type { Router } from 'vue-router';
import { useAppStore } from '@/store/app';
// import { useMultipleTabStore } from '@/store/multipleTab';
import { useUserStore } from '@/store/user';
import { usePermissionStore } from '@/store/permission';
import { PageEnum } from '@gui-pkg/enums';
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
