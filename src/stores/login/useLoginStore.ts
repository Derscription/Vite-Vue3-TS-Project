import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from "@/service/login/loginService"
import localCache from "@/utils/cache"
import router from "@/router"
import { mapMenusToPermissions, mapMenusToRoutes } from "@/utils/useMenus"
import { useSystemRequestStore } from "@/stores"

import type {
  IAccountLoginActionPayload,
  ILoginUserInfoType,
  loginResult,
  loginUserInfo,
  userMenuInfo,
  IUserMenusType,
} from "../types"

const useLoginStore = defineStore("loginStore", () => {
  // * State
  const token = ref("")
  const userInfo = ref<ILoginUserInfoType>()
  const userMenus = ref<IUserMenusType[]>()
  const permissions = ref<string[]>()
  const systemRequestStore = useSystemRequestStore()

  // * Getters

  // * Actions
  const accountLoginAction = async (payload: IAccountLoginActionPayload) => {
    // 1.实现登录逻辑
    const loginResult = await accountLoginRequest<loginResult>(payload)
    const { id, token: loginResultToken } = loginResult.data
    token.value = loginResultToken
    localCache.setCache("token", token.value)

    // 处理登录时，pinia没有部门和角色列表信息
    systemRequestStore.getInitialDataAction()

    // 2.请求用户信息
    const loginUserInfo = await requestUserInfoById<loginUserInfo>(id)
    userInfo.value = loginUserInfo.data
    localCache.setCache("userInfo", userInfo.value)

    // 3.请求用户菜单
    const userMenusResult = await requestUserMenusByRoleId<userMenuInfo>(userInfo.value.role.id)
    userMenus.value = userMenusResult.data
    localCache.setCache("userMenus", userMenus.value)

    // 4.添加动态路由
    // userMenus => routes映射
    // 将routes => router.main.children
    const routes = mapMenusToRoutes(userMenus.value)
    routes.forEach((route) => {
      router.addRoute("main", route)
    })

    // 获取用户按钮权限
    const permissionsArray = mapMenusToPermissions(userMenus.value)
    permissions.value = permissionsArray

    // 5.跳转首页
    router.push("/main")
  }

  const loadLocalLogin = () => {
    const loginResultToken = localCache.getCache("token")
    if (loginResultToken) {
      token.value = loginResultToken
      // 处理刷新时，pinia没有部门和角色列表信息
      systemRequestStore.getInitialDataAction()
    }
    const loginUserInfo = localCache.getCache("userInfo")
    if (loginUserInfo) {
      userInfo.value = loginUserInfo
    }
    const userMenusInfo = localCache.getCache("userMenus")
    if (userMenusInfo) {
      userMenus.value = userMenusInfo
      // 添加动态路由
      if (userMenus.value) {
        const routes = mapMenusToRoutes(userMenus.value)
        routes.forEach((route) => {
          router.addRoute("main", route)
        })

        // 获取用户按钮权限
        const permissionsArray = mapMenusToPermissions(userMenus.value)
        permissions.value = permissionsArray
      }
    }
  }

  return {
    // * State
    token,
    userInfo,
    userMenus,
    permissions,

    // * Getters

    // * Actions
    accountLoginAction,
    loadLocalLogin,
  }
})

export default useLoginStore
