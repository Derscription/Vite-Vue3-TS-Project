<script setup lang="ts">
import type { CSSProperties } from "vue"

defineProps<{
  title: string
  itemStyle?: CSSProperties
}>()
</script>

<template>
  <ElCard class="card">
    <template #header>
      <div class="card-header">
        <span :style="itemStyle">{{ title }}</span>
        <span>
          <slot name="headerRight"></slot>
        </span>
      </div>

      <div>
        <slot name="content"></slot>
      </div>
    </template>
    <div class="item">
      <slot name="bottom"></slot>
    </div>
  </ElCard>
</template>

<style scoped lang="less">
.card {
  ::v-deep .el-card__header {
    padding: 10px 20px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
  }

  .item {
    margin-bottom: 10px;
  }
}
</style>
