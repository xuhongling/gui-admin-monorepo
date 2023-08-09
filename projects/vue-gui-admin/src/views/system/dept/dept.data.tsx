import { VxeFormItemProps, VxeGridPropTypes } from '@gui-pkg/antdcomponents';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: VxeGridPropTypes.Columns = [
  {
    title: '部门名称',
    field: 'deptName',
    width: 180,
    align: 'center',
    fixed: 'left',
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
        const status = row.status;
        const enable = ~~status === 0;
        const color = enable ? 'green' : 'red';
        const text = enable ? '启用' : '停用';
        return h(Tag, { color: color }, () => text);
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
    field: 'deptName',
    title: '部门名称',
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
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentDept',
    label: '上级部门',
    component: 'TreeSelect',

    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
