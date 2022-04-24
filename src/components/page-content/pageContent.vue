<script setup lang="ts">
import { useSearchStore, useSystemStore } from "@/stores"
import { usePermission } from "@/hooks/usePermission"

import type { ITableConfigType } from "./pageContentType"

const props = defineProps<{
  contentTableConfig: ITableConfigType
  pageName: string
}>()
const emtis = defineEmits<{
  (e: "newBtnClick"): void
  (e: "editBtnClick", item: any): void
}>()

const systemStore = useSystemStore()
const searchStore = useSearchStore()

// 0.获取操作权限
const isCreate = usePermission(props.pageName, "create")
const isUpdate = usePermission(props.pageName, "update")
const isDelete = usePermission(props.pageName, "delete")
const isQuery = usePermission(props.pageName, "query")

// 1.双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => getPageData())

// 2.发送网络请求
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) {
    ElMessage({
      type: "warning",
      message: "没有请求权限!!!",
      duration: 1500,
      showClose: true,
      center: true,
    })
    return
  }
  systemStore.getPageListAction({
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo,
    },
  })
}
getPageData()

// 3.从pinia中获取数据
const data = computed(() => systemStore.pageListData(props.pageName))

// 4.获取其他的动态插槽名称
const otherPropSlots = props.contentTableConfig.propList.filter((item) => {
  if (item.slotName === "status") return false
  if (item.slotName === "createAt") return false
  if (item.slotName === "updateAt") return false
  if (item.slotName === "handler") return false
  if (!item.slotName) return false
  return true
})

// 5.删除/编辑/新建操作
const handleDeleteClick = (item: any) => {
  // 弹出一个对话框，给用户一个反悔的机会
  ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      systemStore.deletePageDataAction({
        pageName: props.pageName,
        id: item.id,
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除!",
        duration: 1000,
        showClose: true,
      })
    })
}
const handlerNewUser = () => {
  emtis("newBtnClick")
}
const handleEditClick = (item: any) => {
  emtis("editBtnClick", item)
}

// 点击刷新按钮，刷新数据
const refreshPageContent = () => getPageData(searchStore.formData)

defineExpose({
  getPageData,
})
</script>

<template>
  <div class="page-content">
    <CodeTable
      :user-list="data.list ?? []"
      :user-list-count="data.count"
      :content-table-config="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #header-handler>
        <template v-if="isCreate">
          <template
            v-if="!contentTableConfig.isNotShowCreate && !contentTableConfig.isNotShowHeaderTitle"
          >
            <ElButton @click="handlerNewUser" type="primary">
              {{ contentTableConfig.headerTitle }}
            </ElButton>
          </template>
        </template>
        <template v-if="isQuery">
          <ElButton type="warning" @click="refreshPageContent">
            <ElIcon><refresh-right /></ElIcon>
          </ElButton>
        </template>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <ElButton :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable === 1 ? "启用" : "禁用" }}
        </ElButton>
      </template>

      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>

      <template #handler="scope">
        <div class="handler-btns">
          <template v-if="isUpdate">
            <template v-if="!contentTableConfig.isNotShowEdit">
              <ElButton type="primary" @click="handleEditClick(scope.row)">
                <ElIcon class="handler-btn-icon">
                  <edit />
                </ElIcon>
                编辑
              </ElButton>
            </template>
          </template>
          <template v-if="isDelete">
            <ElButton type="danger" @click="handleDeleteClick(scope.row)">
              <ElIcon class="handler-btn-icon"> <delete /></ElIcon>
              删除
            </ElButton>
          </template>
        </div>
      </template>

      <!-- 在pageContent中动态插入剩余插槽 -->
      <template v-for="item of otherPropSlots" :key="item.prop" #[item.slotName!]="scope">
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </CodeTable>
  </div>
</template>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;

  .handler-btns {
    .handler-btn-icon {
      margin-right: 5px;
    }
  }
}

::v-deep .el-table__cell {
  z-index: unset;
}
</style>
