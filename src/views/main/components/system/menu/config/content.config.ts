import type { ITableConfigType } from "@/base-ui/west-table/types/codeTableType"

export const contentTableConfig: ITableConfigType = {
  title: "菜单列表",
  headerTitle: "创建菜单",
  propList: [
    { prop: "name", label: "菜单名称", minWidth: "100" },
    { prop: "type", label: "类型", minWidth: "60" },
    { prop: "url", label: "菜单的url", minWidth: "100" },
    { prop: "icon", label: "菜单icon", minWidth: "100" },
    { prop: "permission", label: "按钮权限", minWidth: "100" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "200",
      slotName: "createAt",
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "200",
      slotName: "updateAt",
    },
    {
      label: "操作",
      minWidth: "190",
      slotName: "handler",
    },
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: "id",
    treeProp: {
      children: "children",
    },
  },
  showFooter: false,
}
