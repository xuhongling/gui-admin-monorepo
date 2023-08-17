<template>
  <PageWrapper contentFullHeight fixedHeight>
    <VxeBasicTable class="w-full h-full" ref="tableRef" v-bind="gridOptions">
      <template #action="{ row }">
        <a-space>
          <a-tooltip placement="bottom">
            <template #title>
              <span>编辑角色</span>
            </template>
            <a-button type="link" size="small" @click="handleEdit(row)">
              <template #icon><Icon icon="clarity:note-edit-line" /></template>
            </a-button>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>删除此角色</span>
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
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Icon } from '@gui-pkg/components';
  import { PageWrapper, BasicTableProps, VxeBasicTable, VxeGridInstance, useDrawer } from '@gui-pkg/antdcomponents';
  import { columns, searchFormSchema } from './role.data';
  import { getRoleListByPage } from '@/api/demo/system';
  import RoleDrawer from './RoleDrawer';

  const [registerDrawer, { openDrawer }] = useDrawer();
  const tableRef = ref<VxeGridInstance>();
  const gridOptions = reactive<BasicTableProps>({
    id: tableRef.value,
    keepSource: true,
    editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
    columns: columns,
    treeConfig: {
      children: 'children',
      indent: 20,
      showIcon: true,
      iconOpen: 'vxe-icon-square-minus',
      iconClose: 'vxe-icon-square-plus'
    },
    toolbarConfig: {
      buttons: [
        {
          content: '新增角色',
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
          const tableListData = await getRoleListByPage({
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            ...form,
          });
          return tableListData;
        },
      },
    },
  });

  function handleCreate() {
    openDrawer(true, {
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

  // 编辑用户资料
  function handleEdit(row) {
    openDrawer(true, {
      record: row,
      isUpdate: true,
    });
  }
  // 删除此账号
  function handleDelete(row) {
    console.log(row, '删除此账号');
  }
</script>

