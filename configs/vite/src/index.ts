import { resolve } from 'path'
import dayjs from 'dayjs'
import { red } from 'picocolors'
import { readPackageJSON } from 'pkg-types'
import type { UserConfig } from 'vite'
import { loadEnv, mergeConfig } from 'vite'
import { configVitePlugins } from './plugins'
import type { PresetType } from './presets'
import { createPreset } from './presets'
import { OUTPUT_DIR } from './constants'
import { resolveProxy, wrapperEnv } from './utils'

export * from './constants'

export async function createViteConfig(command: 'build' | 'serve', mode: string, cwd: string, { preset }: { preset: PresetType }, ): Promise<UserConfig> {
  console.log()
  console.log(
    red('当前处于开发测试阶段，还会有大量更新完善，如遇到问题，请及时反馈！\n'),
  )
  console.log()

  const root = cwd
  const env = loadEnv(mode, root)
  const { dependencies, devDependencies, name, version } = await readPackageJSON(cwd)

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)
  const {
    VITE_PUBLIC_PATH,
    VITE_PROXY,
    VITE_PORT,
    VITE_USE_MOCK,
    VITE_DROP_CONSOLE,
    VITE_USE_HTTPS,
  } = viteEnv

  const commonConfig: UserConfig = {
    root,
    base: VITE_PUBLIC_PATH,
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.vue', '.json', '.css', '.less'],
      alias: {
        '@': `${resolve(root, 'src')}`,
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    define: {
      __VITE_USE_MOCK__: VITE_USE_MOCK,
      // Suppress vue-i18-next warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify({
        pkg: { dependencies, devDependencies, name, version },
        lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
    },
    server: {
      https: VITE_USE_HTTPS,
      open: true,
      host: true,
      port: Number(VITE_PORT),
      proxy: !VITE_USE_HTTPS ? resolveProxy(VITE_PROXY) : undefined,
    },
    build: {
      target: 'es2020',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2048,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'pinia', 'vue-router'],
            mockjs: ['mockjs'],
          },
        },
      },
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

  return mergeConfig(commonConfig, await createPreset(preset)())
}
