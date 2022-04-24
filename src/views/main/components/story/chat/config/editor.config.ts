import type { IConfigType } from "@/base-ui/west-edit/type/codeEditType"

export const editorConfig: IConfigType = {
  height: 500,
  placeholder: "请输入内容",
  onchangeTimeout: 500,
  zIndex: 1000,
  menus: [
    "head",
    "bold",
    "fontSize",
    "fontName",
    "italic",
    "underline",
    "strikeThrough",
    "indent",
    "lineHeight",
    "foreColor",
    "backColor",
    "link",
    "list",
    "todo",
    "justify",
    "quote",
    "emoticon",
    "image",
    "video",
    "table",
    "code",
    "splitLine",
    "undo",
    "redo",
  ],
  fontSizes: {
    "x-small": { name: "10px", value: "1" },
    small: { name: "13px", value: "2" },
    normal: { name: "16px", value: "3" },
    large: { name: "18px", value: "4" },
    "x-large": { name: "24px", value: "5" },
    "xx-large": { name: "32px", value: "6" },
    "xxx-large": { name: "48px", value: "7" },
  },
}
