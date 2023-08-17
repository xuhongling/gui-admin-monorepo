import { PermissionModeEnum, ThemeEnum, CacheTypeEnum } from '@gui-pkg/enums'
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
}

export interface MultiTabsSetting {
  cache?: boolean;
  show?: boolean;
  showQuick?: boolean;
  canDrag?: boolean;
  showRedo?: boolean;
  showFold?: boolean;
}

export interface MenuSetting {
  bgColor?: string
  fixed?: boolean
  collapsed?: boolean
  show?: boolean
  hidden?: boolean
  split?: boolean
  menuWidth?: number
  theme?: ThemeEnum
  topMenuAlign?: 'start' | 'center' | 'end'
  accordion?: boolean
  closeMixSidebarOnChange?: boolean
  collapsedShowTitle?: boolean
  mixSideFixed?: boolean
}

export interface ProjectConfig {
  // Permission mode
  permissionMode: PermissionModeEnum
  // menuSetting
  menuSetting: MenuSetting
  // Multi-tab settings
  multiTabsSetting: MultiTabsSetting
  // Storage location of permission related information
  permissionCacheType?: CacheTypeEnum
  // Whether to show the configuration button
  showSettingButton?: boolean
  // Whether to show the theme switch button
  showDarkModeToggle?: boolean
  // Website gray mode, open for possible mourning dates
  grayMode?: boolean
  // Whether to turn on the color weak mode
  colorWeak?: boolean
  // Theme color
  themeColor?: string
  // The main interface is displayed in full screen, the menu is not displayed, and the top
  fullContent?: boolean
  // Whether to display the logo
  showLogo?: boolean
  // Whether to show the global footer
  showFooter?: boolean
  // Whether to open the top progress bar
  openNProgress?: false
  // pageLayout whether to enable keep-alive
  openKeepAlive?: boolean
  // Lock screen time
  lockTime?: number
  // Show breadcrumbs
  showBreadCrumb?: boolean
  // Show breadcrumb icon
  showBreadCrumbIcon?: boolean
  // Whether to open back to top
  useOpenBackTop?: boolean
  // Is it possible to embed iframe pages
  canEmbedIFramePage?: boolean
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch?: boolean
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending?: boolean
}
