import type { IPageUserListDataType } from "@/stores/types/index"

export { IPageUserListDataType }

export interface IPropListType {
  prop?: string
  label: string
  minWidth: string
  slotName?: string
  fixed?: string | boolean
}

interface IChildrenPropsType {
  rowKey: string
  treeProp: {
    children: "children" | string
  }
}

export interface ITableConfigType {
  title: string
  propList: IPropListType[]
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  childrenProps?: IChildrenPropsType
  showFooter?: boolean
  height?: string
  headerTitle?: string
  isNotShowCreate?: boolean
  isNotShowEdit?: boolean
  isNotShowHeaderTitle?: boolean
}

export interface IPageInfo {
  currentPage: number
  pageSize: number
}
