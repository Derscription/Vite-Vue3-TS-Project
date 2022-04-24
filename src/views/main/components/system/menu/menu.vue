<script setup lang="ts">
import { contentTableConfig } from "./config/content.config"
</script>

<template>
  <div class="menu">
    <PageContent page-name="menu" :content-table-config="contentTableConfig"></PageContent>
  </div>
</template>

<style scoped lang="less"></style>
