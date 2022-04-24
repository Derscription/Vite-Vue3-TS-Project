type menusType =
  | "head"
  | "bold"
  | "fontSize"
  | "fontName"
  | "italic"
  | "underline"
  | "strikeThrough"
  | "indent"
  | "lineHeight"
  | "foreColor"
  | "backColor"
  | "link"
  | "list"
  | "todo"
  | "justify"
  | "quote"
  | "emoticon"
  | "image"
  | "video"
  | "table"
  | "code"
  | "splitLine"
  | "undo"
  | "redo"

export interface IConfigType {
  height: number
  placeholder: string
  onchangeTimeout: number
  menus: menusType[]
  zIndex: number
  fontSizes: {
    "x-small": { name: string; value: "1" }
    small: { name: string; value: "2" }
    normal: { name: string; value: "3" }
    large: { name: string; value: "4" }
    "x-large": { name: string; value: "5" }
    "xx-large": { name: string; value: "6" }
    "xxx-large": { name: string; value: "7" }
  }
}
