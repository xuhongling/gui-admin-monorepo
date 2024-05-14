import type { PluginOption } from 'vite'
import type { ViteEnv } from '../utils'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { configHtmlPlugin } from './html'
import { configMockPlugin } from './mock'
import { configCompressPlugin } from './compress'
import { configVisualizerConfig } from './visualizer'
import { configSvgIconsPlugin } from './svg-icons'
import { configUnocssPlugin } from './unocss'
import { createConfigPlugin } from './config'
import { configHttpsPlugin } from './https'

export async function configVitePlugins(root: string, viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // handle .vue files
    vue(),
    // have to
    vueJsx(),
  ]

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy())

  // vite-plugin-html
  vitePlugins.push(await configHtmlPlugin(root, viteEnv, isBuild))

  // unocss
  vitePlugins.push(configUnocssPlugin())

  vitePlugins.push(createConfigPlugin())

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig())

  // http2
  vitePlugins.push(configHttpsPlugin(viteEnv))

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      ),
    )
  }

  return vitePlugins
}
