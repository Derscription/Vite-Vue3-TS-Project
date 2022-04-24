<script setup lang="ts">
import { contentTableConfig } from "./config"
</script>

<template>
  <div class="list">
    <PageContent :content-table-config="contentTableConfig" page-name="story"></PageContent>
  </div>
</template>

<style scoped lang="less"></style>
