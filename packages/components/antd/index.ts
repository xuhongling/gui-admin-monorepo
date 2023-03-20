import type { App } from 'vue'
import VXETable from 'vxe-table'

// components
export { BasicArrow, BasicTitle, BasicHelp } from './src/basic/index'
export { Button, PopConfirmButton } from './src/button/index'
export { BasicDrawer, useDrawer, useDrawerInner } from './src/drawer/index'
export { BasicModal, useModalContext, useModal, useModalInner } from './src/modal/index'
export { BasicForm, useComponentRegister, useForm, ApiSelect, RadioButtonGroup, ApiTreeSelect, ApiRadioGroup, ApiCascader } from './src/form/index'
export { VxeBasicTable } from './src/vxe-table/index'

// types
export type { ModalProps, ModalWrapperProps } from './src/modal/src/typing'
export type { DrawerInstance, DrawerFooterProps, DrawerProps, DrawerActionType} from './src/drawer/src/typing'
export type { FormActionType, RegisterFn, UseFormReturnType, FormProps, FormSchema } from './src/form/src/types/form'
export type { FormItem } from './src/form/src/types/formItem'
export type { BasicTableProps } from './src/vxe-table/src/types'
export type { VxeFormItemProps, VxeGridPropTypes } from 'vxe-table'

// 初始化component，注册组件
export function initAntdComponent(app: App, global = true) {
  app.use(VXETable)
  if (!global) return
}
