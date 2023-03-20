import { request } from '@gui-pkg/request';

enum Api {
  // The address does not exist
  Error = '/basic-api/error',
}

/**
 * @description: Trigger ajax error
 */

export const fireErrorApi = () => request.get({ url: Api.Error });
