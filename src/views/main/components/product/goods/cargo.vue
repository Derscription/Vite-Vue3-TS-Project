<script setup lang="ts">
import { usePageSearch } from "@/hooks/usePageSearch"
import { contentTableConfig, searchFormConfig } from "./config"

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
</script>

<template>
  <div class="goods">
    <PageSearch
      :search-form-config="searchFormConfig"
      @reset-btn-click="handleResetClick"
      @query-btn-click="handleQueryClick"
    ></PageSearch>
    <PageContent ref="pageContentRef" page-name="goods" :content-table-config="contentTableConfig">
      <template #image="scope">
        <ElImage
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template>

      <template #oldPrice="scope">￥{{ scope.row.oldPrice }}</template>
    </PageContent>
  </div>
</template>

<style scoped lang="less"></style>
