import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import ElementPlus from "unplugin-element-plus/vite"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    outDir: "./build",
  },
  resolve: {
    // 配置别名
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://152.136.185.210:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router", "pinia"],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      // 分析包
      dirs: ["src/components", "src/base-ui", "src/views"],
      // 组件名称包含目录，防止同名组件冲突
      // directoryAsNamespace: true,
    }),
    ElementPlus(),
  ],
})
