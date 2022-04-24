<script setup lang="ts">
import { usePageModal } from "@/hooks/usePageModal"
import { usePageSearch } from "@/hooks/usePageSearch"
import { searchFormConfig, contentTableConfig, modalConfig } from "./config"

// 调用搜索的hooks
const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()
// 调用模态框的hooks
const { pageModalRef, defaultInfo, handleEditData, handleNewData } = usePageModal()
</script>

<template>
  <div class="department">
    <PageSearch
      :search-form-config="searchFormConfig"
      @query-btn-click="handleQueryClick"
      @reset-btn-click="handleResetClick"
    ></PageSearch>
    <PageContent
      ref="pageContentRef"
      page-name="department"
      :content-table-config="contentTableConfig"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    ></PageContent>
    <PageModal
      ref="pageModalRef"
      :default-info="defaultInfo"
      page-name="department"
      :modal-form-config="modalConfig"
    ></PageModal>
  </div>
</template>

<style scoped lang="less"></style>
