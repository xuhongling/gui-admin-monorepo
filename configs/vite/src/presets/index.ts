import { createAntdPreset } from './antd'

export type FrameworkType = 'antd' | 'ele'

export function createPreset(framework: FrameworkType) {
  const presets = {
    antd: createAntdPreset,
  }
  return presets[framework]
}
