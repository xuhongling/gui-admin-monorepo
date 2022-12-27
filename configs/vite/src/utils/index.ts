/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite'

export interface ViteEnv {
  VITE_USE_PWA: boolean
  VITE_PUBLIC_PATH: string
  VITE_PROXY: [string, string][]
  VITE_GLOB_APP_TITLE: string
  VITE_GLOB_APP_SHORT_NAME: string
  VITE_DROP_CONSOLE: boolean
  VITE_USE_HTTPS: boolean
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  VITE_PORT: string | number
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Record<string, any>): ViteEnv {
  const viteEnv: Partial<ViteEnv> = {}
  for (const key of Object.keys(envConf)) {
    let realname = envConf[key].replace(/\\n/g, '\n')
    realname =
      realname === 'true' ? true : realname === 'false' ? false : realname

    if (key === 'VITE_PROXY' && realname) {
      try {
        realname = JSON.parse(realname.replace(/'/g, '"'))
      } catch (error) {
        realname = ''
      }
    }

    viteEnv[key] = realname
    if (typeof realname === 'string') {
      process.env[key] = realname
    } else if (typeof realname === 'object') {
      process.env[key] = JSON.stringify(realname)
    }
  }
  return viteEnv as ViteEnv
}

/**
 * Configure according to the proxy list
 * @param proxyList
 */
export function resolveProxy(proxyList: [string, string][] = []) {
  const proxy: Record<string, ProxyOptions> = {}
  for (const [prefix, target] of proxyList) {
    const isHttps = /^https:\/\//.test(target)
    // https://github.com/http-party/node-http-proxy#options
    proxy[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    }
  }
  return proxy
}
