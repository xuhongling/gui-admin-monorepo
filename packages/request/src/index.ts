// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosResponse } from 'axios'
import type { RequestOptions, RequestResult } from '@gui-pkg/types'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'

import { VAxios } from './Axios'
import { checkStatus } from './checkStatus'
import { context } from '../bridge'
import { isString, isFunction, clone, deepMerge, appendUrlParams } from '@gui-pkg/utils'
import { RequestEnum, ResultEnum, ContentTypeEnum } from './constants'
import { joinTimestamp, formatRequestDate } from './helper'

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<RequestResult>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }

    const { data } = res

    // 错误的时候返回
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error('请求出错，请稍候重试')
    }

    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    //const { code, result, message } = data
    const { code, detail, content, result, message  } = data

    let resultData = null;
    result ? resultData = result : resultData = detail;

    // 定义请求返回的code成功的值，可以在外部设置
    const resultSetting = context.resultSetting();
    const SUCCESS = resultSetting ? resultSetting.SUCCESS : ResultEnum.SUCCESS;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data && Reflect.has(data, 'code') && (code === SUCCESS);

    if (hasSuccess) {
      if (content || message) {
        context.noticeFunction /*&& context.noticeFunction.success({
          content: content,
          duration: 2000,
          keepAliveOnHover: true,
        })*/
      }
      // 请求返回的数据
      return resultData;
    }

    // context.msgFunction.error(content)
    // throw new Error(content)
    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg: any = ''
    const TIMEOUT = resultSetting ? resultSetting.TIMEOUT : ResultEnum.TIMEOUT;
    switch (code) {
      case TIMEOUT:
        timeoutMsg = '登录超时,请重新登录!'
        context.timeoutFunction?.()
        break
      default:
        if (message) {
          timeoutMsg = message ? message : '';
        }
        if (content) {
          timeoutMsg = content ? content : '';
        }
    }

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMessageMode === 'modal') {
      context.errorModalFunction({
        title: '错误提示',
        content: timeoutMsg,
      })
    } else if (options.errorMessageMode === 'message') {
      context.errorFunction(timeoutMsg)
    }

    throw new Error(timeoutMsg || '请求出错，请稍候重试')
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options
    if (apiUrl) {
      const _apuUrl = isString(apiUrl)
        ? apiUrl
        : isFunction(apiUrl)
        ? apiUrl?.()
        : ''

      // 处理多个接口 Api Url
      if (joinPrefix && _apuUrl.startsWith("[[")) {
        const apiUrlArr = JSON.parse(_apuUrl);
        for (let i = 0; i < apiUrlArr.length; i++) {
          const apiUrl = config.url ? config.url : '';
          if (apiUrl.includes(apiUrlArr[i][0])) {
            config.url = `${apiUrlArr[i][1]}${config.url}`;
          }
        }
      } else if (joinPrefix){
        config.url = `${_apuUrl}${config.url}`
      }
    }

    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false),
        )
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          Object.keys(config.data).length > 0
        ) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = appendUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const token = context.getTokenFunction?.()
    if (
      token &&
      (config as Recordable<any>)?.requestOptions?.withToken !== false
    ) {
      // jwt token
      ;(config as Recordable<any>).headers.Authorization =
        options.authenticationScheme
          ? `${options.authenticationScheme} ${token}`
          : token
    }
    return config
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message, config } = error || {}
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = '接口请求超时,请刷新页面重试!'
      }
      if (err?.includes('Network Error')) {
        errMessage = '网络异常，请检查您的网络连接是否正常!'
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          context.errorModalFunction({
            title: '错误提示',
            content: errMessage,
          })
        } else if (errorMessageMode === 'message') {
          context.errorFunction(errMessage)
        }
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as unknown as string)
    }

    checkStatus(error?.response?.status, msg, errorMessageMode)
    return Promise.reject(error)
  },
}

const createAxios = (opt?: Partial<CreateAxiosOptions>) => {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,

        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: () => context.apiUrl,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      opt || {},
    ),
  )
}

export const request = createAxios()

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//   },
// });
