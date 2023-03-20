<template>
  <div class="table-demo">
    <a-page-header title="VxeTable表格" sub-title="只展示部分操作，详细功能请查看VxeTable官网事例"/>
    <VxeBasicTable ref="tableRef" v-bind="gridOptions" class="tableCon">
      <template #action="{ row }">
        <a-button danger size="small" @click="removeRowEvent(row)">删除</a-button>
      </template>
    </VxeBasicTable>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { vxeTableColumns, vxeTableFormSchema } from './tableData';
  import { BasicTableProps, VxeBasicTable, VxeGridInstance } from '@gui-pkg/antdcomponents';
  import { demoListApi } from '@/api/demo/table';

  const { createMessage } = useMessage();

  const tableRef = ref<VxeGridInstance>();
  const gridOptions = reactive<BasicTableProps>({
    id: 'VxeTable',
    keepSource: true,
    editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
    columns: vxeTableColumns,
    toolbarConfig: {
      buttons: [
        {
          content: '在第一行新增',
          buttonRender: {
            name: 'AButton',
            props: {
              type: 'primary',
              preIcon: 'mdi:page-next-outline',
            },
            events: {
              click: () => {
                tableRef.value?.insert({ name: '新增的' });
                createMessage.success('新增成功');
              },
            },
          },
        },
        {
          content: '在最后一行新增',
          buttonRender: {
            name: 'AButton',
            props: {
              type: 'warning',
            },
            events: {
              click: () => {
                tableRef.value?.insertAt({ name: '新增的' }, -1);
              },
            },
          },
        },
      ],
    },
    formConfig: {
      enabled: true,
      items: vxeTableFormSchema,
    },
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page, form }) => {
          console.log(page, form, 'page, form ');
          const tableListData = await demoListApi({
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            ...form,
          });
          return tableListData;
        },
        queryAll: async ({ form }) => {
          return await demoListApi(form);
        },
      },
    },
  });

  // 操作按钮
  function removeRowEvent(row) {
    console.log(row, 'rowrowrow');
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .table-demo {
    width: 100%;
    height: 100%;
    padding: 16px;
    .tableCon {
      height: calc(100% - 72px);
    }
  }
</style>
