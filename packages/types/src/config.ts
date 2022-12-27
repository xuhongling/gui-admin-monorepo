export type LocaleType = 'zh_CN' | 'en'

export interface LocaleConfig {
  // Current language
  locale: LocaleType
  // default language
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
}

export interface StaticConfig {
  /**
   * Permission Type:
   * frontend: indicates that permissions are controlled by the front end
   * backend: indicates that the permissions are controlled by the backend
   */
  authType: 'frontend' | 'backend'

  // Display a progress bar at the top when switching pages
  enableProgress: boolean
}

export interface DynamicConfig {
  __: string
}

export interface GlobConfig {
  // Site title
  title: string
  // Service interface url
  apiUrl: string
  // Project abbreviation
  shortName: string
}

export interface GlobEnvConfig {
  // Site title 网站标题
  VITE_GLOB_APP_TITLE: string
  // Service interface url 服务接口url
  VITE_GLOB_API_URL: string
  // Project abbreviation 项目简称
  VITE_GLOB_APP_SHORT_NAME: string
  // 是否开启本地的接口调试地址
  VITE_LOCALHOST?: string
  // 本地的接口调试地址
  VITE_LOCALHOST_API_URL?: string
}

export interface MultiTabsSetting {
  cache: boolean;
  show: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRedo: boolean;
  showFold: boolean;
}
