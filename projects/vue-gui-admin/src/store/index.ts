import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState, PersistedStateFactoryOptions } from 'pinia-plugin-persistedstate'
import { createStorageName } from '@gui-pkg/utils'

const pinia: any = createPinia()

/**
 * @link https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
 */
function persistGlobalConfig(
  keyPrefix: string,
): PersistedStateFactoryOptions {
  return {
    storage: localStorage,
    key: (id) => `${keyPrefix}__${id}`,
  }
}

pinia.use(
  // @ts-ignore
  createPersistedState(persistGlobalConfig(createStorageName(import.meta.env))),
)

export function setupStore(app: App<Element>) {
  app.use(pinia)
}

export { pinia };
