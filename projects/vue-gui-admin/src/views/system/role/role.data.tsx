import { VxeFormItemProps, VxeGridPropTypes } from '@gui-pkg/antdcomponents';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import { setRoleStatus } from '@/api/demo/system';

export const columns: VxeGridPropTypes.Columns = [
  {
    title: '角色名称',
    field: 'roleName',
    width: 180,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '角色值',
    field: 'roleValue',
    width: 180,
    align: 'center',
  },
  {
    title: '排序',
    field: 'orderNo',
    width: 70,
    align: 'center',
  },
  {
    title: '状态',
    field: 'status',
    width: 120,
    align: 'center',
    slots: {
      default: ({ row }) => {
        if (!Reflect.has(row, 'pendingStatus')) {
          row.pendingStatus = false;
        }
        return h(Switch, {
          checked: row.status === '1',
          checkedChildren: '停用',
          unCheckedChildren: '启用',
          loading: row.pendingStatus,
          onChange(checked: boolean) {
            row.pendingStatus = true;
            const newStatus = checked ? '1' : '0';
            const { createMessage } = useMessage();
            setRoleStatus(row.id, newStatus)
              .then(() => {
                row.status = newStatus;
                createMessage.success(`已成功修改角色状态`);
              })
              .catch(() => {
                createMessage.error('修改角色状态失败');
              })
              .finally(() => {
                row.pendingStatus = false;
              });
          },
        });
      },
    },
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
    align: 'center',
  },
  {
    title: '备注',
    field: 'remark',
  },
  {
    width: 160,
    title: '操作',
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const searchFormSchema: VxeFormItemProps[] = [
  {
    field: 'roleNme',
    title: '角色名称',
    itemRender: {
      name: 'AInput',
    },
    span: 6,
  },
  {
    field: 'status',
    title: '状态',
    itemRender: {
      name: 'ASelect',
      props: {
        options: [
          { label: '启用', value: '0' },
          { label: '停用', value: '1' },
        ],
      },
    },
    span: 6,
  },
  {
    span: 12,
    align: 'right',
    className: '!pr-0',
    itemRender: {
      name: 'AButtonGroup',
      children: [
        {
          props: { type: 'primary', content: '查询', htmlType: 'submit' },
          attrs: { class: 'mr-2' },
        },
        { props: { type: 'default', htmlType: 'reset', content: '重置' } },
      ],
    },
  },
];

export const formSchema = [
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleValue',
    label: '角色值',
    required: true,
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
  },
];
