<script setup lang="ts">
import { usePageModal } from "@/hooks/usePageModal"
import { usePageSearch } from "@/hooks/usePageSearch"
import { useSystemRequestStore } from "@/stores"
import { contentTableConfig, searchFormConfig, modalFormConfig } from "./config"
import { getMenuLeafKeys } from "@/utils/useMenus"
import { ElTree } from "element-plus"

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()

// 1.处理pageModal的Hook
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallback = (item: any) => {
  const leafKey = getMenuLeafKeys(item.menuList)
  nextTick(() => elTreeRef.value?.setCheckedKeys(leafKey))
}
const { pageModalRef, defaultInfo, handleEditData, handleNewData } = usePageModal(
  undefined,
  editCallback,
)

const systemRequestStore = useSystemRequestStore()
const { entireMenu } = storeToRefs(systemRequestStore)

const otherInfo = ref({})

const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>

<template>
  <div class="role">
    <PageSearch
      :search-form-config="searchFormConfig"
      @reset-btn-click="handleResetClick"
      @query-btn-click="handleQueryClick"
    ></PageSearch>
    <PageContent
      ref="pageContentRef"
      page-name="role"
      :content-table-config="contentTableConfig"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    ></PageContent>
    <PageModal
      page-name="role"
      ref="pageModalRef"
      :default-info="defaultInfo"
      :modal-form-config="modalFormConfig"
      :other-info="otherInfo"
    >
      <template #default>
        <div class="menu-tree">
          <ElTree
            ref="elTreeRef"
            :data="entireMenu"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'name' }"
            @check="handleCheckChange"
          />
        </div>
      </template>
    </PageModal>
  </div>
</template>

<style scoped lang="less">
.role {
  .menu-tree {
    margin-left: 20px;
  }
}
</style>
