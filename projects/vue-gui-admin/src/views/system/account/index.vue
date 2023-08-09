<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <div class="w-3/4 xl:w-4/5 p-5">
      <VxeBasicTable class="w-full h-full" ref="tableRef" v-bind="gridOptions">
        <template #action="{ row }">
          <a-space>
            <a-tooltip placement="bottom">
              <template #title>
                <span>查看用户详情</span>
              </template>
              <a-button type="link" size="small" @click="handleView(row)">
                <template #icon><Icon icon="clarity:info-standard-line" /></template>
              </a-button>
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template #title>
                <span>编辑用户资料</span>
              </template>
              <a-button type="link" size="small" @click="handleEdit(row)">
                <template #icon><Icon icon="clarity:note-edit-line" /></template>
              </a-button>
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template #title>
                <span>删除此账号</span>
              </template>
              <a-button type="link" danger size="small">
                <template #icon>
                  <a-popconfirm placement="left" title="是否确认删除？" ok-text="确定" cancel-text="取消" @confirm="handleDelete(row)">
                    <Icon icon="ant-design:delete-outlined" />
                  </a-popconfirm>
                </template>
              </a-button>
            </a-tooltip>
          </a-space>
        </template>
      </VxeBasicTable>
    </div>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Icon } from '@gui-pkg/components';
  import { PageWrapper, BasicTableProps, VxeBasicTable, VxeGridInstance, useModal } from '@gui-pkg/antdcomponents';
  import { columns, searchFormSchema } from './account.data';
  import { getAccountList } from '@/api/demo/system';
  import DeptTree from './DeptTree.vue';
  import AccountModal from './AccountModal.vue';

  const [registerModal, { openModal }] = useModal();
  const tableRef = ref<VxeGridInstance>();
  const gridOptions = reactive<BasicTableProps>({
    id: tableRef.value,
    keepSource: true,
    editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
    columns: columns,
    toolbarConfig: {
      buttons: [
        {
          content: '新增账号',
          buttonRender: {
            name: 'AButton',
            props: {
              type: 'primary',
              preIcon: 'grommet-icons:add',
            },
            events: {
              click: () => handleCreate(),
            },
          },
        },
      ],
    },
    formConfig: {
      enabled: true,
      items: searchFormSchema,
    },
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page, form }) => {
          const tableListData = await getAccountList({
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            ...form,
          });
          return tableListData;
        },
      },
    },
  });

  const handleSelect = async (deptId = '')=> {
    const tableData = await getAccountList({deptId: deptId});
    tableRef.value.loadData(tableData.items)
  }

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      console.log(values, 'values');
    } else {
      console.log(values, 'values');
    }
  }
  // 查看用户详情
  function handleView(row) {
    console.log(row, '查看用户详情');
  }
  // 编辑用户资料
  function handleEdit(row) {
    openModal(true, {
      record: row,
      isUpdate: true,
    });
  }
  // 删除此账号
  function handleDelete(row) {
    console.log(row, '删除此账号');
  }
</script>
