import { request } from '@gui-pkg/request';

enum Api {
  TREE_OPTIONS_LIST = '/basic-api/tree/getDemoOptions',
}

/**
 * @description: Get sample options value
 */
export const treeOptionsListApi = (params?: Recordable) =>
  request.get<Recordable[]>({ url: Api.TREE_OPTIONS_LIST, params });
