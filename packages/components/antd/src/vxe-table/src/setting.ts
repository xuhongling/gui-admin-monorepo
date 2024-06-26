// 用于在不修改组件的情况下设置常规配置
import { VXETable } from 'vxe-table';

const vxeTable = {
  table: {
    border: true,
    // border: 'inner',
    round: true,
    stripe: true,
    columnConfig: {
      resizable: true,
      isCurrent: true,
      isHover: true,
    },
    rowConfig: {
      isCurrent: true,
      isHover: true,
    },
    emptyRender: {
      name: 'AEmpty',
    },
    printConfig: {},  // 打印配置项
    exportConfig: {}, // 导出配置项
    customConfig: {
      storage: true, // 是否启用 localStorage 本地保存，会将列操作状态保留在本地
    },
  },
  grid: {
    toolbarConfig: {
      enabled: true,
      export: true,
      zoom: true,
      print: true,
      refresh: true,
      custom: true,
    },
    pagerConfig: {
      pageSizes: [20, 50, 100, 500],
      pageSize: 20,
      autoHidden: true,
    },
    proxyConfig: {
      form: true,
      props: {
        result: 'list',
        total: 'total',
      },
    },
    zoomConfig: {},
  },
  // scrollbar setting
  scrollbar: {
    // Whether to use native scroll bar
    // After opening, the menu, modal, drawer will change the pop-up scroll bar to native
    native: false,
  },
}

VXETable.setup(vxeTable);
