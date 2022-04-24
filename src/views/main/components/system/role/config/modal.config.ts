import type { IWestForm } from "@/base-ui/west-form/types/codeFormType"

export const modalFormConfig: IWestForm = {
  title: "角色",
  formItems: [
    {
      field: "name",
      type: "input",
      label: "角色名",
      placeholder: "请输入角色名",
    },
    {
      field: "intro",
      type: "input",
      label: "角色介绍",
      placeholder: "请输入角色介绍",
    },
  ],
  colLayout: {
    span: 24,
  },
  itemStyle: {},
}
