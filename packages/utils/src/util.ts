import { isObject, cloneDeep } from 'lodash-es';

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

/**
 * @description:  Set ui mount node
 */
const getPopupContainer = (node?: HTMLElement): HTMLElement => {
  return (node?.parentNode as HTMLElement) ?? document.body
}

export {
  deepMerge,
  appendUrlParams,
  openWindow,
  NOOP,
  getPopupContainer
}
