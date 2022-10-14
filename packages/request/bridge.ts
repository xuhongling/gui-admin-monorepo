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
  apiUrl?: string
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
}

export const initRequest = async (_context: ContextOptions) => {
  context = _context
}
export const setMsg = (func: AnyFunction<any>) => {
  context.msgFunction = func
}
export const setNoice = (func: AnyFunction<any>) => {
  context.noticeFunction = func
}
