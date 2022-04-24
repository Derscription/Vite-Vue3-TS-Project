import type { App } from "vue"

import {
  ArrowDown,
  ChatLineRound,
  CircleClose,
  Delete,
  Edit,
  Expand,
  Fold,
  Goods,
  Iphone,
  Monitor,
  Refresh,
  RefreshRight,
  Search,
  Setting,
  UserFilled,
  Warning,
} from "@element-plus/icons-vue"

const icons = [
  Iphone,
  UserFilled,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Fold,
  Expand,
  ArrowDown,
  CircleClose,
  Search,
  Refresh,
  Edit,
  Delete,
  RefreshRight,
  Warning,
]

export default function registerIcon(app: App) {
  icons.forEach((icon) => {
    app.component(icon.name, icon)
  })
}
