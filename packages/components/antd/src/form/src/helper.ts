import type { Rule as ValidationRule } from 'ant-design-vue/lib/form/interface';
import type { ComponentType } from './types/index';
import { dateUtil, isNumber, isObject } from '@gui-pkg/utils'

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component.includes('Input') || component.includes('Complete')) {
    return '请输入'
  }
  if (component.includes('Picker')) {
    return '请选择'
  }
  if (
    component.includes('Select') ||
    component.includes('Cascader') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch')
  ) {
    // return `请选择${label}`;
    return '请选择'
  }
  return ''
}

const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker']

function genType() {
  return [...DATE_TYPE, 'RangePicker']
}

export function setComponentRuleType(
  rule: ValidationRule,
  component: ComponentType,
  valueFormat: string,
) {
  if (Reflect.has(rule, 'type')) {
    return;
  }
  if (['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(component)) {
    rule.type = valueFormat ? 'string' : 'object';
  } else if (['RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(component)) {
    rule.type = 'array';
  } else if (['InputNumber'].includes(component)) {
    rule.type = 'number';
  }
}

export function processDateValue(attr: Recordable, component: string) {
  const { valueFormat, value } = attr;
  if (valueFormat) {
    attr.value = isObject(value) ? dateUtil(value).format(valueFormat) : value;
  } else if (DATE_TYPE.includes(component) && value) {
    attr.value = dateUtil(attr.value);
  }
}

export const defaultValueComponents = [
  'Input',
  'InputPassword',
  'InputNumber',
  'InputSearch',
  'InputTextArea',
];

export function handleInputNumberValue(component?: ComponentType, val?: any) {
  if (!component) return val;
  if (defaultValueComponents.includes(component)) {
    return val && isNumber(val) ? `${val}` : val;
  }
  return val;
}

/**
 * 时间字段
 */
export const dateItemType = genType();

// TODO 自定义组件封装会出现验证问题，因此这里目前改成手动触发验证
export const NO_AUTO_LINK_COMPONENTS: ComponentType[] = [
  'Upload',
  'ApiTransfer',
  'ApiTree',
  'ApiTreeSelect',
  'ApiRadioGroup',
  'ApiCascader',
  'AutoComplete',
  'RadioButtonGroup',
  'ApiSelect',
];

export const simpleComponents = ['Divider', 'BasicTitle'];

export function isIncludeSimpleComponents(component?: ComponentType) {
  return simpleComponents.includes(component || '');
}
