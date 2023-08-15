import type { ProjectConfig } from '@gui-pkg/types';
import { PermissionModeEnum } from '@gui-pkg/enums';

// 系统默认配置，修改默认参数需要清除浏览器缓存
export const defaultConfig: ProjectConfig = {
  // 权限模式，默认前端角色权限模式
  // ROUTE_MAPPING: 前端模式（菜单由路由生成，默认）
  // ROLE：前端模式（菜单路由分开）
  // BACK: 后台模式，动态获取
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  // 菜单设置，后面再完善菜单设置
  // split： 是否拆分菜单
  menuSetting: {
    collapsed: true,
    split: true,
  },
};
