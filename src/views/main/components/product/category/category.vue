<script setup lang="ts">
import { usePageModal } from "@/hooks/usePageModal"
import { usePageSearch } from "@/hooks/usePageSearch"
import { searchFormConfig, contentTableConfig, modalConfig } from "./config"

const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()
const { pageModalRef, defaultInfo, handleEditData, handleNewData } = usePageModal()
</script>

<template>
  <div class="category">
    <PageSearch
      :search-form-config="searchFormConfig"
      @query-btn-click="handleQueryClick"
      @reset-btn-click="handleResetClick"
    ></PageSearch>
    <PageContent
      ref="pageContentRef"
      page-name="category"
      :content-table-config="contentTableConfig"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    ></PageContent>
    <PageModal
      ref="pageModalRef"
      page-name="category"
      :modal-form-config="modalConfig"
      :default-info="defaultInfo"
    ></PageModal>
  </div>
</template>

<style scoped lang="less"></style>
