<script setup lang="ts">
import { searchFormConfig, contentTableConfig, modalFormConfig } from "./config"
import { usePageSearch } from "@/hooks/usePageSearch"
import { usePageModal } from "@/hooks/usePageModal"
import { useSystemRequestStore } from "@/stores"

// pageSearch相关的Hook逻辑
const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
// pageModal相关的Hook逻辑
// 1.处理密码的逻辑
const newCallback = () => {
  const passwordItem = modalFormConfig.formItems.find((item) => item.field === "password")
  if (passwordItem?.isHidden) passwordItem.isHidden = false
}
const editCallback = () => {
  const passwordItem = modalFormConfig.formItems.find((item) => item.field === "password")
  if (passwordItem?.isHidden) passwordItem.isHidden = true
}

const systemRequestStore = useSystemRequestStore()
// 2.动态添加部门和角色列表
const modelFormConfigRef = computed(() => {
  const departmentItem = modalFormConfig.formItems.find((item) => item.field === "departmentId")
  if (departmentItem?.options) {
    departmentItem.options = systemRequestStore.entireDepartment.map((item) => ({
      title: item.name,
      value: item.id,
    }))
  }
  const roleItem = modalFormConfig.formItems.find((item) => item.field === "roleId")
  if (roleItem?.options) {
    roleItem.options = systemRequestStore.entireRole.map((item) => ({
      title: item.name,
      value: item.id,
    }))
  }

  return modalFormConfig
})
// 3.调用Hook获取公共变量和函数
const { pageModalRef, defaultInfo, handleEditData, handleNewData } = usePageModal(
  newCallback,
  editCallback,
)
</script>

<template>
  <div class="user">
    <PageSearch
      :search-form-config="searchFormConfig"
      @reset-btn-click="handleResetClick"
      @query-btn-click="handleQueryClick"
    ></PageSearch>
    <PageContent
      ref="pageContentRef"
      page-name="users"
      :content-table-config="contentTableConfig"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    ></PageContent>
    <PageModal
      ref="pageModalRef"
      page-name="users"
      :modal-form-config="modelFormConfigRef"
      :default-info="defaultInfo"
    ></PageModal>
  </div>
</template>

<style scoped lang="less"></style>
