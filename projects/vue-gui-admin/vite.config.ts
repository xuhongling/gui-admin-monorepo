import type { ViteConfig } from '@config/vite'
import { createViteConfig } from '@config/vite'

export default createViteConfig(process.cwd(), 'antd') as ViteConfig
