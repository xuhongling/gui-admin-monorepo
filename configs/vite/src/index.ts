import type { UserConfig, UserConfigFn } from 'vite'
import type { FrameworkType } from './presets'
import { mergeConfig, loadEnv, defineConfig } from 'vite'
import { readPackageJSON } from 'pkg-types'
import { wrapperEnv, resolveProxy } from './utils'
import { resolve } from 'path'
import { configVitePlugins } from './plugins'
import { createPreset } from './presets'
import { OUTPUT_DIR } from './constants'
import dayjs from 'dayjs'
import { cyan } from 'picocolors'

export * from './constants'

export type ViteConfig = Promise<UserConfig | UserConfigFn>

export async function createViteConfig(cwd: string, framework: FrameworkType,): Promise<UserConfig | UserConfigFn> {
  console.log()
  console.log(
    cyan(
      '当前处于开发测试阶段，还会有大量更新，仅供参考，请勿用于实际项目！\n',
    ),
  )
  console.log()

  return defineConfig(async ({ command, mode }) => {
    const root = cwd
    const env = loadEnv(mode, root)
    const { dependencies, devDependencies, name, version } = await readPackageJSON(cwd)

    // The boolean type read by loadEnv is a string. This function can be converted to boolean type
    const viteEnv = wrapperEnv(env)
    const {
      VITE_PUBLIC_PATH,
      VITE_PROXY,
      VITE_PORT,
      VITE_DROP_CONSOLE,
    } = viteEnv
    const commonConfig: UserConfig = {
      root,
      base: VITE_PUBLIC_PATH,

      resolve: {
        extensions: ['.js', '.ts', '.tsx', '.vue', '.json', '.css', '.less'],
        alias: {
          '@': `${resolve(root, 'src')}`,
          '#': `${resolve(root, '../../packages/vbenComponents/src')}`,
          vue: 'vue/dist/vue.esm-bundler.js',
        },
      },
      define: {
        // Suppress vue-i18-next warning
        __INTLIFY_PROD_DEVTOOLS__: false,
        __APP_INFO__: JSON.stringify({
          pkg: { dependencies, devDependencies, name, version },
          lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        }),
      },
      server: {
        open: true,
        host: true,
        port: Number(VITE_PORT),
        proxy: resolveProxy(VITE_PROXY),
      },
      build: {
        target: 'es2020',
        cssTarget: 'chrome80',
        outDir: OUTPUT_DIR,
        reportCompressedSize: false,
        chunkSizeWarningLimit: 2048,
      },
      esbuild: {
        pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
      },
      optimizeDeps: {
        include: ['dayjs/locale/en', 'dayjs/locale/zh-cn', '@iconify/iconify'],
        // exclude: ['vue-demi'],
      },
      plugins: await configVitePlugins(root, viteEnv, command === 'build'),
    }

    return mergeConfig(commonConfig, await createPreset(framework)())
  })
}
