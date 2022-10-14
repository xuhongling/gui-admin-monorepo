import type { PluginOption } from 'vite'
import type { ViteEnv } from '../utils'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configHtmlPlugin } from './html'
import { configCompressPlugin } from './compress'
import { configSvgIconsPlugin } from './svg-icons'
import { createConfigPlugin } from './config'

export async function configVitePlugins(
  root: string,
  viteEnv: ViteEnv,
  isBuild: boolean,
) {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue({ reactivityTransform: true }),
    // have to
    vueJsx(),
  ]

  // vite-plugin-html
  vitePlugins.push(await configHtmlPlugin(root, viteEnv, isBuild))

  vitePlugins.push(createConfigPlugin())

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

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
