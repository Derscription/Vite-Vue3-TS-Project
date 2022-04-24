<script setup lang="ts">
import { pathMapBreadcrumb } from "@/utils/useMenus"
import { useLoginStore } from "@/stores"

const emit = defineEmits<{
  (e: "foldChange", isFold: boolean): void
}>()
const loginStore = useLoginStore()

const { userMenus } = storeToRefs(loginStore)
const isFold = ref(false)

const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit("foldChange", isFold.value)
}

// 面包屑的数据类型 [{name: "", path: ""}]
const breadcrumb = computed(() => {
  const route = useRoute()
  return pathMapBreadcrumb(userMenus.value!, route.path)
})
</script>

<template>
  <div class="nav-header">
    <ElIcon class="fold-menu" @click="handleFoldClick">
      <template v-if="isFold">
        <fold />
      </template>
      <template v-if="!isFold">
        <expand />
      </template>
    </ElIcon>

    <div class="content">
      <CodeBreadcrumb :breadcrumb="breadcrumb"></CodeBreadcrumb>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    flex: 1;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
