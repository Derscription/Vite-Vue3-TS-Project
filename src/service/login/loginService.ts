import { westRequest } from ".."

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
  userMenus = "/role/",
}

export function accountLoginRequest<T>(account: any) {
  return westRequest.post<T>({
    url: LoginAPI.AccountLogin,
    data: account,
  })
}

export function requestUserInfoById<T>(id: number) {
  return westRequest.get<T>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false,
  })
}

export function requestUserMenusByRoleId<T>(id: number) {
  return westRequest.get<T>({
    url: LoginAPI.userMenus + id + "/menu",
    showLoading: false,
  })
}
