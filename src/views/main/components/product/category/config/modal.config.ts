import type { IWestForm } from "@/base-ui/west-form/types/codeFormType"

export const modalConfig: IWestForm = {
  title: "类别",
  formItems: [
    {
      field: "name",
      type: "input",
      label: "角色名",
      placeholder: "请输入角色名称",
    },
  ],
  colLayout: {
    span: 24,
  },
  itemStyle: {},
}
