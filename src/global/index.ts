import type { App } from "vue"

import registerIcon from "./registerIcon"
import registerProperties from "./registerProperties"

export function globalRegisterApp(app: App) {
  registerIcon(app)
  registerProperties(app)
}
