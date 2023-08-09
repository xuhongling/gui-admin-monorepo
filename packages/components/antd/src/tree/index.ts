import { withInstall } from '@gui-pkg/utils'

import basicTree from './src/BasicTree.vue';
import './style';

export const BasicTree = withInstall(basicTree);
export type { ContextMenuItem } from './src/hooks/useContextMenu';
export * from './src/types/tree';
