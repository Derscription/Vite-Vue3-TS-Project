import type { IWestForm } from "@/base-ui/west-form/types/codeFormType"

export const searchFormConfig: IWestForm = {
  labelWidth: "120px",
  itemStyle: {
    padding: "20px 40px",
  },
  formItems: [
    {
      field: "name",
      type: "input",
      label: "角色名称",
      placeholder: "请输入角色名称",
    },
    {
      field: "intro",
      type: "input",
      label: "权限介绍",
      placeholder: "请输入权限介绍",
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "创建时间",
      placeholder: "请选择创建时间范围",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange",
      },
    },
  ],
}
