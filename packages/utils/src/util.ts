import { isObject } from 'lodash-es'
import { isClient, isWindow } from '@vueuse/core'
import { isUndefined, isNull, cloneDeep} from 'lodash-es'

// @ts-ignore
function NOOP() {}

function openWindow(
  url: string,
  opt?: {
    target?: '_self' | '_blank' | string
    noopener?: boolean
    noreferrer?: boolean
  },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  appendUrlParams('www.google.com', obj)
 *  ==>www.google.com?a=3&b=4
 */
function appendUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, '?') + parameters
}

// 深度合并
function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  const res: any = cloneDeep(src);
  for (key in target) {
    res[key] = isObject(res[key]) ? deepMerge(res[key], target[key]) : target[key];
  }
  return res;
}

function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

/**
 * @description:  Set ui mount node
 */
const getPopupContainer = (node?: HTMLElement): HTMLElement => {
  return (node?.parentNode as HTMLElement) ?? document.body
}

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
function isAsyncFunction(val: unknown): val is Function {
  return val instanceof AsyncFunction;
}

const isNullOrUndefined = <T = unknown>(val?: T): val is T =>  isUndefined(val) || isNull(val)

export {
  isUrl,
  deepMerge,
  appendUrlParams,
  openWindow,
  NOOP,
  isClient,
  isWindow,
  getPopupContainer,
  isAsyncFunction,
  isNullOrUndefined,
}
