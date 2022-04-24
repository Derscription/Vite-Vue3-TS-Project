import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import { globalRegisterApp } from "./global"
import { setupStore } from "@/stores"

import "normalize.css"
import "./assets/css/index.less"

createApp(App)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(globalRegisterApp)
  .use(createPinia())
  .use(setupStore) // 调用解决刷新使vuex中保存的数据消失的回调
  .use(router)
  .mount("#app")
