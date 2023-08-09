import { getMenuList } from '@/api/demo/system';
import { VxeFormItemProps, VxeGridPropTypes } from '@gui-pkg/antdcomponents';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '@gui-pkg/components';

export const columns: VxeGridPropTypes.Columns = [
  {
    title: '菜单名称',
    field: 'menuName',
    width: 220,
    align: 'center',
    fixed: 'left',
    treeNode: true,
  },
  {
    title: '图标',
    field: 'icon',
    width: 70,
    align: 'center',
    slots: {
      default: ({ row }) => {
        return h(Icon, { icon: row.icon });;
      },
    },
  },
  {
    title: '权限标识',
    field: 'permission',
    width: 180,
    align: 'center',
  },
  {
    title: '组件',
    field: 'component',
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
    width: 90,
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
    width: 160,
    title: '操作',
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const searchFormSchema: VxeFormItemProps[] = [
  {
    field: 'menuName',
    title: '菜单名称',
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

const isDir = (type: string) => type === '0';
const isMenu = (type: string) => type === '1';
const isButton = (type: string) => type === '2';

export const formSchema = [
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '目录', value: '0' },
        { label: '菜单', value: '1' },
        { label: '按钮', value: '2' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentMenu',
    label: '上级菜单',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getMenuList,
      fieldNames: {
        label: 'menuName',
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
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'routePath',
    label: '路由地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
    },
  },
  {
    field: 'isExt',
    label: '是否外链',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },

  {
    field: 'show',
    label: '是否显示',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '是', value: '0' },
        { label: '否', value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
];
