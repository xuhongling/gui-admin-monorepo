import { optionsListApi } from '@/api/demo/select';
import { VxeFormItemProps, VxeGridPropTypes } from '@gui-pkg/antdcomponents';

export const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    title: '序号',
    type: 'seq',
    fixed: 'left',
    width: '50',
    align: 'center',
  },
  {
    title: '固定列',
    field: 'name',
    width: 150,
    showOverflow: 'tooltip',
    fixed: 'left',
  },
  {
    title: '自适应列',
    field: 'address',
  },
  {
    title: '自定义列(自定义导出)',
    field: 'no',
    width: 200,
    showOverflow: 'tooltip',
    align: 'center',
    slots: {
      default: ({ row }) => {
        const text = `自定义${row.no}`;
        return [<div class="text-red-500">{text}</div>];
      },
    },
    exportMethod: ({ row }) => {
      return `自定义${row.no}导出`;
    },
  },
  {
    title: '自定义编辑',
    width: 150,
    field: 'name1',
    align: 'center',
    editRender: {
      name: 'AInput',
      placeholder: '请点击输入',
    },
  },
  {
    title: '开始时间',
    width: 150,
    field: 'beginTime',
    showOverflow: 'tooltip',
    align: 'center',
  },
  {
    title: '结束时间',
    width: 150,
    field: 'endTime',
    showOverflow: 'tooltip',
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

export const vxeTableFormSchema: VxeFormItemProps[] = [
  {
    field: 'field0',
    title: '名称',
    itemRender: {
      name: 'AInput',
    },
    span: 6,
  },
  /*{
    field: 'field1',
    title: '类型',
    itemRender: {
      name: 'ASelect',
    },
    span: 6,
  },*/
  {
    field: 'field1',
    title: '类型',
    itemRender: {
      name: 'AApiSelect',
      props: {
        api: optionsListApi,
        resultField: 'list',
        labelField: 'name',
        valueField: 'id',
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
