export interface IDepartmentListType {
  id: number
  leader: string
  name: string
  parentId: number
  createAt: Date
  updateAt: Date
}

export interface IRoleMenuListChildrenType extends IRoleMenusListType {
  parentId: number
}

export interface IRoleMenusListType {
  children: IRoleMenuListChildrenType[]
  icon: string
  id: number
  name: string
  sort: number
  type: number
  url: string
}

export interface IRoleListType {
  createAt: Date
  id: number
  intro: string
  menuList: IRoleMenusListType[]
  name: string
  updateAt: Date
}

interface IMenusChildrenType {
  children: IMenusChildrenType[] | undefined | null
  id: number
  name: string
  parentId: number
  sort: number
  type: number
  url: string
  createAt?: Date
  updateAt?: Date
}

export interface IMenusListType {
  children: IMenusChildrenType[]
  id: number
  name: string
  icon: string
  sort: number
  type: number
  url: string
  createAt: Date
  updateAt: Date
}
