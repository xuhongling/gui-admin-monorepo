import type { ValidationRule } from 'ant-design-vue/lib/form/Form'
import type { ComponentType } from './types/index'
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
  if (
    ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(
      component,
    )
  ) {
    rule.type = valueFormat ? 'string' : 'object'
  } else if (
    ['RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(component)
  ) {
    rule.type = 'array'
  } else if (['InputNumber'].includes(component)) {
    rule.type = 'number'
  }
}

export function processDateValue(attr: Recordable, component: string) {
  const { valueFormat, value } = attr
  if (valueFormat) {
    attr.value = isObject(value)
      ? dateUtil(value as unknown as Date).format(valueFormat)
      : value
  } else if (DATE_TYPE.includes(component) && value) {
    attr.value = dateUtil(attr.value)
  }
}

export function handleInputNumberValue(component?: ComponentType, val?: any) {
  if (!component) return val
  if (
    ['Input', 'InputPassword', 'InputSearch', 'InputTextArea'].includes(
      component,
    )
  ) {
    return val && isNumber(val) ? `${val}` : val
  }
  return val
}

/**
 * 时间字段
 */
export const dateItemType = genType()

export const defaultValueComponents = [
  'Input',
  'InputPassword',
  'InputSearch',
  'InputTextArea',
]
