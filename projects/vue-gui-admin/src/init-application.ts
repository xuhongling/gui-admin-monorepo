import { initRequest } from '@gui-pkg/request'
import { deepMerge, getGlobalConfig } from '@gui-pkg/utils'
import { useMessage } from '@/hooks/web/useMessage'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useAppStoreWithOut } from '@/store/modules/app'
// To decouple the modules below `packages/*`, they no longer depend on each other
// If the modules are heavily dependent on each other, you need to provide a decoupling method, and the caller will pass the parameters
// Each module needs to provide `bridge` file as a decoupling method

// 为了解耦 `packages/*` 下面各模块，不再相互依赖
// 如果模块相互依赖严重，则需要对外提供解耦方式，由调用方去进行参数传递
// 各个模块需要提供 `bridge` 文件作为解耦方式
async function initPackages() {
  const _initRequest = async () => {
    const { createMessage, createErrorModal } = useMessage()
    const { apiUrl } = getGlobalConfig(import.meta.env)
    await initRequest(()=> {
      return {
        apiUrl,
        getTokenFunction: () => {
          const userStore = useUserStoreWithOut()
          return userStore.getToken
        },
        errorFunction: createMessage.error,
        errorModalFunction: createErrorModal,
        noticeFunction: null,
        timeoutFunction: () => {
          const userStore = useUserStoreWithOut()
          userStore.setToken(undefined)
          userStore.logout(true)
        },
        unauthorizedFunction: (msg?: string) => {
          const userStore = useUserStoreWithOut()
          userStore.setToken(undefined)
          userStore.logout(true)
          return msg || '用户没有权限（令牌、用户名、密码错误）!'
        },
        handleErrorFunction: (message, mode) => {
          if (mode === 'modal') {
            createErrorModal({ title: '错误提示', content: message })
          } else if (mode === 'message') {
            createMessage.error(message)
          }
        },
      }
    })
  }

  await Promise.all([_initRequest()])
}

// Initial project configuration
function initAppConfigStore() {
  const appStore = useAppStoreWithOut()
  const projectConfig = appStore.getProjectConfig
  const projCfg = deepMerge(projectConfig || {})

  appStore.setProjectConfig(projCfg)
}

// 初始化
export async function initApplication() {
  // ! Need to pay attention to the timing of execution
  // ! 需要注意调用时机
  await initPackages()

  // Initialize internal system configuration
  initAppConfigStore()
}
