import { createViteConfig } from '@config/vite'
import { UserConfig } from 'vite'

//export default createViteConfig(process.cwd(), 'antd') as ViteConfig
export default (async ({ command, mode }): Promise<UserConfig> => {
  const cfg = await createViteConfig(command, mode, process.cwd(), { preset: 'antd' })
  return cfg
})
