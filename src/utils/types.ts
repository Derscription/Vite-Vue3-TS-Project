import type { RouteRecordRaw } from "vue-router"
import type {
  IUserMenusType,
  IUserMenusChildrenType,
  IUserMenusChildrenOfChildrenType,
} from "@/stores/types"
import type { IBreadcrumb } from "@/base-ui/west-breadcrumb/types/codeBreadcrumbType"

export type currentUserMenusType =
  | IUserMenusType[]
  | IUserMenusChildrenType[]
  | IUserMenusChildrenOfChildrenType[]

export type userMenusType =
  | IUserMenusType
  | IUserMenusChildrenType
  | IUserMenusChildrenOfChildrenType

export { RouteRecordRaw, IUserMenusType, IBreadcrumb, IUserMenusChildrenOfChildrenType }
