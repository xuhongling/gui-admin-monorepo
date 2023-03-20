import { ComponentType } from './componentType';

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (!component) return;
  if (component.includes('RangePicker')) {
    return ['请选择', '请选择'];
  }
  if (component.includes('Input') || component.includes('Complete') || component.includes('Rate')) {
    return '请输入';
  } else {
    return '请选择';
  }
}
