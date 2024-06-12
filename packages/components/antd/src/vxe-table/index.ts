import { withInstall } from '@gui-pkg/utils'
import vxeBasicTable from './src/VxeBasicTable';
import { VXETable } from 'vxe-table';
import VXETablePluginAntd from './src/components';
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx';
import './src/css/index.scss';
import './src/setting';

export const VxeBasicTable = withInstall(vxeBasicTable);

export type { BasicTableProps } from './src/types'
export type { VxeFormItemProps, VxeGridPropTypes } from 'vxe-table'

VXETable.use(VXETablePluginAntd).use(VXETablePluginExportXLSX);
