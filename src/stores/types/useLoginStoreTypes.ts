import type { IResponseData } from "@/service/request/requestType"

export interface IAccountLoginActionPayload {
  name: string
  password: string
}

interface ILoginUserInfoDepartmentType {
  createAt?: Date
  id: number
  leader: string
  name: string
  parentId?: number
  updateAt?: Date
}

interface ILoginUserInfoRoleType {
  createAt?: Date
  id: number
  intro: string
  name: string
  updateAt?: Date
}

export interface ILoginUserInfoType {
  cellphone: number
  createAt?: Date
  department: ILoginUserInfoDepartmentType
  enable: number
  id: number
  name: string
  realname: string
  role: ILoginUserInfoRoleType
  updateAt?: Date
}

export interface ILoginUserToken {
  id: number
  name: string
  token: string
}

export interface IUserMenusChildrenOfChildrenType extends IUserMenusChildrenType {
  permission: string
}

export interface IUserMenusChildrenType {
  children?: IUserMenusChildrenOfChildrenType[]
  id: number
  name: string
  parentId: number
  sort?: number
  type: number
  url?: string
}

export interface IUserMenusType {
  children?: IUserMenusChildrenType[]
  icon: string
  id: number
  name: string
  sort: number
  type: number
  url: string
}

export type loginResult = IResponseData<ILoginUserToken>
export type loginUserInfo = IResponseData<ILoginUserInfoType>
export type userMenuInfo = IResponseData<IUserMenusType[]>
