import type {
  currentUserMenusType,
  IUserMenusType,
  RouteRecordRaw,
  userMenusType as matchingMenuType,
  IBreadcrumb,
  IUserMenusChildrenOfChildrenType,
} from "./types"

// 保存第一个路由对象
let firstMenu: matchingMenuType

// Menus 转 路由对象
export function mapMenusToRoutes(userMenus: IUserMenusType[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块：
  // 获取所有文件信息对象 (vite内部方法)
  const routeFiles = import.meta.globEager("../router/main/**/*.ts")
  // 获取所有文件的路径信息，并遍历这个路径信息
  Object.keys(routeFiles).forEach((key) => {
    allRoutes.push(routeFiles[key].default)
  })

  // 2.根据菜单获取需要添加的routes
  /**
   * * userMenus:
   * * type === 1 -> children -> type === 1 -> children
   * * type === 2 -> url -> route
   */
  const _recurseGetRoute = (menus: currentUserMenusType) => {
    menus.forEach((menu) => {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        menu.children && _recurseGetRoute(menu.children)
      }
    })
  }

  _recurseGetRoute(userMenus)

  return routes
}

// 根据当前浏览器地址栏中的url，查找并记录页面嵌套的层次
export function pathMapBreadcrumb(
  userMenus: currentUserMenusType,
  currentPath: string,
): IBreadcrumb[] {
  const breadcrumb: IBreadcrumb[] = []

  _recursePathMapToMenu(userMenus, currentPath, breadcrumb)

  return breadcrumb
}

// 根据当前浏览器地址栏中的url，去查找对应的Menu对象
export function _recursePathMapToMenu(
  userMenus: currentUserMenusType,
  currentPath: string,
  breadcrumb?: IBreadcrumb[],
): matchingMenuType | undefined {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = _recursePathMapToMenu(menu.children ?? [], currentPath, breadcrumb)
      if (findMenu) {
        breadcrumb?.push({ name: menu.name })
        breadcrumb?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 获取当前用户菜单的权限类型
export function mapMenusToPermissions(userMenus: currentUserMenusType) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: currentUserMenusType) => {
    menus.forEach((menu) => {
      if (menu.type === 1 || menu.type === 2) {
        menu.children && _recurseGetPermission(menu.children)
      } else if (menu.type === 3) {
        const permission = (menu as IUserMenusChildrenOfChildrenType).permission
        permissions.push(permission)
      }
    })
  }

  _recurseGetPermission(userMenus)

  return permissions
}

// 获取当前选项的叶子节点
export function getMenuLeafKeys(menuList: currentUserMenusType) {
  const leafKeys: number[] = []

  const _recurseGetLeaf = (menuList: currentUserMenusType) => {
    menuList.forEach((menu) => {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    })
  }

  _recurseGetLeaf(menuList)

  return leafKeys
}

export { firstMenu }
