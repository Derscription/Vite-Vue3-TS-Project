<script setup lang="ts">
import { ITableConfigType, IPageInfo } from "./types/codeTableType"

const props = withDefaults(
  defineProps<{
    userList: any[]
    contentTableConfig: ITableConfigType
    userListCount: number
    page: IPageInfo
  }>(),
  {
    page: () => ({ currentPage: 1, pageSize: 10 }),
  },
)
const emits = defineEmits<{
  (e: "selectionChange", value: any): void
  (e: "update:page", value: IPageInfo): void
}>()

const handleSelectionChange = (value: any) => {
  emits("selectionChange", value)
}

const handleSizeChange = (pageSize: number) => {
  console.log(`${pageSize} items per page`)
  emits("update:page", { ...props.page, pageSize })
}
const handleCurrentChange = (currentPage: number) => {
  console.log(`current page: ${currentPage}`)
  emits("update:page", { ...props.page, currentPage })
}
</script>

<template>
  <div class="codeTable">
    <div class="header">
      <slot name="header">
        <div class="title">{{ contentTableConfig.title }}</div>
        <div class="handler">
          <slot name="header-handler"></slot>
        </div>
      </slot>
    </div>

    <ElTable
      :data="userList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :row-key="contentTableConfig.childrenProps?.rowKey"
      :tree-props="contentTableConfig.childrenProps?.treeProp"
    >
      <template v-if="contentTableConfig.showSelectColumn">
        <ElTableColumn type="selection" align="center" width="60"></ElTableColumn>
      </template>

      <template v-if="contentTableConfig.showIndexColumn">
        <ElTableColumn type="index" label="序号" align="center" width="80"></ElTableColumn>
      </template>

      <template v-for="item of contentTableConfig.propList" :key="item.prop">
        <ElTableColumn v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ item.prop && scope.row[item.prop] }}
            </slot>
          </template>
        </ElTableColumn>
      </template>
    </ElTable>

    <div class="footer">
      <template v-if="contentTableConfig.showFooter">
        <slot name="footer">
          <ElPagination
            :currentPage="page.currentPage"
            :page-size="page.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userListCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </ElPagination>
        </slot>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.codeTable {
  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-weight: bold;
      font-size: 20px;
    }

    .handler {
      align-items: center;
    }
  }

  .footer {
    margin-top: 15px;

    .el-pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
