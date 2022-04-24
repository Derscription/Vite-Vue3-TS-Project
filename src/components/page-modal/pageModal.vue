<script setup lang="ts">
import { useSystemStore } from "@/stores"
import type { IWestForm } from "./pageModalType"

const props = withDefaults(
  defineProps<{
    modalFormConfig: IWestForm
    defaultInfo?: any
    pageName: string
    otherInfo?: {}
  }>(),
  {
    defaultInfo: () => {},
    otherInfo: () => ({}),
  },
)

const systemStore = useSystemStore()
const title = ref("创建")
const centerDialogVisible = ref(false)
const formData = ref<{ [x: string]: any }>({})
const showTitle = computed(() => title.value + props.modalFormConfig.title)

watch(
  () => props.defaultInfo,
  (newValue) => {
    props.modalFormConfig.formItems.forEach((item) => {
      formData.value[item.field] = newValue[item.field]
    })
  },
)

// 点击确定按钮的逻辑
const handleConfirmClick = () => {
  centerDialogVisible.value = false
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    systemStore.editPageDataAction({
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id,
    })
  } else {
    // 新建
    systemStore.createPageDataAction({
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo },
    })
  }
}

defineExpose({
  centerDialogVisible,
  title,
})
</script>

<template>
  <div class="page-modal">
    <ElDialog :title="showTitle" v-model="centerDialogVisible" width="30%" center destroy-on-close>
      <CodeForm v-bind="modalFormConfig" v-model="formData"></CodeForm>

      <slot></slot>

      <template #footer>
        <span class="dialog-footer">
          <ElButton type="primary" @click="centerDialogVisible = false"> 取消 </ElButton>
          <ElButton type="primary" @click="handleConfirmClick"> 确定 </ElButton>
        </span>
      </template>
    </ElDialog>
  </div>
</template>

<style scoped lang="less"></style>
