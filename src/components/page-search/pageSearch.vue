<script setup lang="ts">
import { useSearchStore } from "@/stores"
import type { IWestForm } from "./pageSearchType"

const props = defineProps<{
  searchFormConfig: IWestForm
}>()
const emits = defineEmits<{
  (e: "resetBtnClick"): void
  (e: "queryBtnClick", formData: any): void
}>()

const searchStore = useSearchStore()

// 双向绑定的属性应该是由配置文件的filed来决定
// 1.优化一：formData中的属性应该动态来决定
const formOriginData: { [x: string]: any } = {}
props.searchFormConfig.formItems.forEach((item) => {
  formOriginData[item.field] = ""
})
const formData = ref(formOriginData)

// 监听formData数据的改变
watch(formData, () => {
  searchStore.setFormData(formData.value)
})

// 2.优化二：当用户点击重置
const handlerResetClick = () => {
  formData.value = formOriginData
  emits("resetBtnClick")
}

// 3.优化三：当用户点击搜索功能
const handleQueryClick = () => {
  emits("queryBtnClick", formData.value)
}
</script>

<template>
  <div class="page-search">
    <div class="search">
      <CodeForm v-bind="searchFormConfig" v-model="formData">
        <template #header>
          <h1 class="title">高级检索</h1>
        </template>
        <template #footer>
          <div class="handle-btns">
            <ElButton type="primary" @click="handlerResetClick">
              <ElIcon class="handle-icon"><refresh /></ElIcon>
              重置
            </ElButton>
            <ElButton type="primary" @click="handleQueryClick">
              <ElIcon class="handle-icon"><search /></ElIcon>
              搜索
            </ElButton>
          </div>
        </template>
      </CodeForm>
    </div>
  </div>
</template>

<style scoped lang="less">
.page-search {
  .search {
    .title {
      color: red;
    }

    .handle-btns {
      text-align: right;
      padding: 0 50px 20px 0;

      .handle-icon {
        margin: 0 3px;
      }
    }
  }
}
</style>
