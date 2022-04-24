<script setup lang="ts">
import type { IConfigType } from "@/base-ui/west-edit/type/codeEditType"
import { createStoryData } from "@/service/main/story/storyService"

const props = withDefaults(
  defineProps<{
    isSeparate?: boolean
    editorConfig: IConfigType
  }>(),
  {
    isSeparate: false,
  },
)

const titleContent = ref("")
const containerContent = ref("")

const handlerUpdateValue = (value: string) => {
  containerContent.value = value
}

const handleCreateStory = async () => {
  try {
    if (titleContent.value && containerContent.value) {
      const createStoryResult = await createStoryData("story", {
        title: titleContent.value,
        content: containerContent.value,
      })

      // 重置内容
      titleContent.value = ""
      containerContent.value = ""

      ElMessage({
        type: "success",
        message: createStoryResult.data,
        duration: 1000,
        showClose: true,
      })
    } else {
      ElMessage({
        type: "warning",
        message: "标题和内容不能为空~",
        duration: 1000,
        showClose: true,
      })
    }
  } catch (error) {
    ElMessage({
      type: "error",
      message: "创建失败~",
      duration: 1500,
      showClose: true,
    })
  }
}
</script>

<template>
  <div class="page-edit">
    <div class="title">
      <div>
        故事标题：
        <ElInput placeholder="请输入内容标题" class="title-input" v-model="titleContent"></ElInput>
      </div>
      <ElButton size="large" type="primary" class="title-button" @click="handleCreateStory">
        提交
      </ElButton>
    </div>

    <div>
      <CodeEdit
        :is-separate="isSeparate"
        :editor-config="editorConfig"
        @update:value="handlerUpdateValue"
        :container-content="containerContent"
      ></CodeEdit>
    </div>
  </div>
</template>

<style scoped lang="less">
.page-edit {
  .title {
    padding-bottom: 20px;
    background-color: #f0f2f5;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-input {
      width: 320px;
    }

    .title-button {
      margin-right: 15px;
    }
  }
}
</style>
