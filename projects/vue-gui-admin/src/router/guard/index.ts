import type { Router, RouteLocationNormalized } from 'vue-router';
import nProgress from 'nprogress';
import { RequestCanceler } from '@gui-pkg/request';
import { setRouteChange } from './routeChange';
import { createPermissionGuard } from './permissionGuard';
import { createStateGuard } from './stateGuard';
import { createParamMenuGuard } from './paramMenuGuard';

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createHttpGuard(router);
  createScrollGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
  createParamMenuGuard(router); // must after createPermissionGuard (menu has been built.)
  createStateGuard(router);
}

/**
 * Hooks for handling page state
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();

  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path);
    // Notify routing changes
    setRouteChange(to);

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}
/**
 * The interface used to close the current page to complete the request when the route is switched
 * @param router
 */
function createHttpGuard(router: Router) {
  let axiosCanceler: Nullable<RequestCanceler>;
  router.beforeEach(async () => {
    // Switching the route will delete the previous request
    axiosCanceler?.removeAllPending();
    return true;
  });
}

// Routing switch back to the top
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href);
  };

  const body = document.body;

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);
    return true;
  });
}

export function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }
    nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    nProgress.done();
    return true;
  });
}
