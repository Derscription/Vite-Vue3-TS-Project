<script setup lang="ts">
import wangEditor from "wangeditor"
import hljs from "highlight.js"
import "highlight.js/styles/monokai-sublime.css"

import type { IConfigType } from "@/base-ui/west-edit/type/codeEditType"

const props = withDefaults(
  defineProps<{
    isSeparate?: boolean
    editorConfig: IConfigType
    containerContent?: string
  }>(),
  {
    isSeparate: false,
  },
)
const emits = defineEmits<{
  (e: "update:value", newHtml: any): void
}>()

// 获取DOM
const toolbalContainerRef = ref<HTMLElement>()
const textContainerRef = ref<HTMLElement>()

// 拿到editor的实现
let editorInstance: wangEditor

onMounted(() => {
  // 调用创建Editor函数
  createEditor()

  watch(
    () => props.containerContent,
    () => {
      editorInstance.txt.html(props.containerContent)
    },
  )
})

// 创建Editor的函数
const createEditor = () => {
  // 判断菜单和编辑区是否分离
  if (props.isSeparate) {
    editorInstance = new wangEditor(toolbalContainerRef.value, textContainerRef.value)
  } else {
    editorInstance = new wangEditor(textContainerRef.value)
  }

  // 调用配置Editor的函数
  setEditor()

  // 创建edtior
  editorInstance.create()
}

// 配置Editor的函数
const setEditor = () => {
  if (!editorInstance) return

  // 默认配置
  editorInstance.highlight = hljs
  editorInstance.config.languageTab = "  "
  // 传入的配置
  editorInstance.config.placeholder = props.editorConfig.placeholder
  editorInstance.config.height = props.editorConfig.height
  editorInstance.config.menus = props.editorConfig.menus
  editorInstance.config.fontSizes = props.editorConfig.fontSizes
  editorInstance.config.onchangeTimeout = props.editorConfig.onchangeTimeout
  editorInstance.config.zIndex = props.editorConfig.zIndex
  // 设置监听
  editorInstance.config.onchange = function (newHtml: string) {
    // 第二步，监控变化，同步更新到 textarea
    // console.log(newHtml) // 拿到html代码
    // console.log(editorInstance.txt.text()) // 拿到文本
    emits("update:value", editorInstance.txt.text())
  }
}
</script>

<template>
  <div class="code-edit">
    <template v-if="isSeparate">
      <div class="toolbar-container" ref="toolbalContainerRef"></div>
    </template>

    <div class="text-container" ref="textContainerRef"></div>
  </div>
</template>

<style scoped lang="less">
.code-edit {
  background-color: #f0f2f5;

  .toolbar-container {
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .text-container {
    border: 1px solid #ccc;
    height: 500px;
    background-color: #ffffff;
    text-align: left;

    ::v-deep(font[size="1"]) {
      font-size: 10px;
    }
    ::v-deep(font[size="2"]) {
      font-size: 13px;
    }
    ::v-deep(font[size="3"]) {
      font-size: 16px;
    }
    ::v-deep(font[size="4"]) {
      font-size: 18px;
    }
    ::v-deep(font[size="5"]) {
      font-size: 24px;
    }
    ::v-deep(font[size="6"]) {
      font-size: 32px;
    }
    ::v-deep(font[size="7"]) {
      font-size: 48px;
    }
  }
}
</style>
