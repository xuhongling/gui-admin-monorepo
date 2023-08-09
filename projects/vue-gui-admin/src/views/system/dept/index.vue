<template>
  <div class="w-full h-full p-5">
    <VxeBasicTable class="w-full h-full" ref="tableRef" v-bind="gridOptions">
      <template #action="{ row }">
        <a-space>
          <a-tooltip placement="bottom">
            <template #title>
              <span>编辑部门</span>
            </template>
            <a-button type="link" size="small" @click="handleEdit(row)">
              <template #icon><Icon icon="clarity:note-edit-line" /></template>
            </a-button>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>删除此部门</span>
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
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Icon } from '@gui-pkg/components';
  import { BasicTableProps, VxeBasicTable, VxeGridInstance, useModal } from '@gui-pkg/antdcomponents';
  import { columns, searchFormSchema } from './dept.data';
  import { getDeptList } from '@/api/demo/system';
  import DeptModal from './DeptModal';

  const [registerModal, { openModal }] = useModal();
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
          content: '新增部门',
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
        query: async () => {
          const tableListData = await getDeptList();
          return { items: tableListData };
        },
      },
    },
  });

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

