import { createAntdPreset } from './antd'

export type PresetType = 'antd' | 'ele'

export function createPreset(framework: PresetType) {
  const presets = {
    antd: createAntdPreset,
  }
  return presets[framework]
}
