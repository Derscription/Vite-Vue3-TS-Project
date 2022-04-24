<script setup lang="ts">
import type { IBreadcrumb } from "./types/codeBreadcrumbType"

defineProps<{
  breadcrumb: IBreadcrumb[]
}>()
</script>

<template>
  <div class="nav-breadcrumb">
    <ElBreadcrumb separator="/">
      <template v-for="item of breadcrumb" :key="item.name">
        <ElBreadcrumbItem :to="item.path && { path: item.path }">
          {{ item.name }}
        </ElBreadcrumbItem>
      </template>
    </ElBreadcrumb>
  </div>
</template>

<style scoped lang="less">
::v-deep .el-breadcrumb__inner {
  cursor: pointer !important;
}
</style>
