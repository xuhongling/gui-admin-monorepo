import type { ErrorMessageMode } from '@gui-pkg/types'

export interface ContextOptions {
  errorFunction: AnyFunction<any>
  msgFunction: AnyFunction<any>
  errorModalFunction: AnyFunction<any>
  noticeFunction: AnyFunction<any>
  getTokenFunction: () => unknown
  unauthorizedFunction: (msg?: string) => void
  timeoutFunction: () => void
  handleErrorFunction: (message?: string, mode?: ErrorMessageMode) => void
  apiUrl?: string,
  resultSetting: AnyFunction<any>
}

export let context: ContextOptions = {
  getTokenFunction: () => undefined,
  unauthorizedFunction: () => {},
  errorFunction: () => {},
  msgFunction: () => {},
  noticeFunction: () => {},
  errorModalFunction: () => {},
  handleErrorFunction: () => {},
  timeoutFunction: () => {},
  apiUrl: '',
  resultSetting: () => {},
}

export const initRequest = async (func: AnyFunction<any>) => {
  context = func()
}
export const setMsg = (func: AnyFunction<any>) => {
  context.msgFunction = func
}
export const setNoice = (func: AnyFunction<any>) => {
  context.noticeFunction = func
}

