<script setup lang="ts">
import { editorConfig } from "./config/editor.config"
</script>

<template>
  <div class="chat">
    <PageEdit :is-separate="true" :editor-config="editorConfig"></PageEdit>
  </div>
</template>

<style scoped lang="less"></style>
