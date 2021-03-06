import type { ITableConfigType } from "@/base-ui/west-table/types/codeTableType"

export const contentTableConfig: ITableConfigType = {
  title: "故事列表",
  isNotShowHeaderTitle: true,
  isNotShowEdit: true,
  propList: [
    { prop: "title", label: "故事标题", minWidth: "100" },
    { prop: "content", label: "我的故事", minWidth: "600" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "200",
      slotName: "createAt",
    },
    { label: "操作", minWidth: "190", slotName: "handler" },
  ],
  showIndexColumn: true,
  showSelectColumn: false,
  height: "427px",
}
