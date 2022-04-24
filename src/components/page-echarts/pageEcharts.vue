<script setup lang="ts">
import { useDashBoardStore } from "@/stores/index"

const dashboardStore = useDashBoardStore()
// 请求数据
dashboardStore.getDashboardDataAction()
const { categoryGoodsCount, categoryGoodsFavor, categoryGoodsSale } = storeToRefs(dashboardStore)

// 饼图和玫瑰图数据
const pieWithRoseData = computed(() =>
  categoryGoodsCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount,
  })),
)
//  分类商品销量数据
const lineData = computed(() => {
  const xLabels: string[] = []
  const lineData: number[] = []
  categoryGoodsSale.value.map((item) => {
    xLabels.push(item.name)
    lineData.push(item.goodsCount)
  })

  return {
    xLabels,
    lineData,
  }
})
// 分类商品的收藏数据
const barData = computed(() => {
  const xLabels: string[] = []
  const barData: number[] = []

  categoryGoodsFavor.value.map((item) => {
    xLabels.push(item.name)
    barData.push(item.goodsFavor)
  })

  return {
    xLabels,
    barData,
  }
})
</script>

<template>
  <div class="page-echarts">
    <ElRow :gutter="10">
      <ElCol :span="12">
        <CodeCard title="分类商品数量(饼图)">
          <template #bottom>
            <PieEcharts :pie-data="pieWithRoseData"></PieEcharts>
          </template>
        </CodeCard>
      </ElCol>
      <ElCol :span="12">
        <CodeCard title="分类商品数量(玫瑰图)">
          <template #bottom>
            <RoseEcharts :rose-data="pieWithRoseData"></RoseEcharts>
          </template>
        </CodeCard>
      </ElCol>
    </ElRow>

    <ElRow :gutter="10" class="content-row">
      <ElCol :span="12">
        <CodeCard title="分类商品的销量">
          <template #bottom>
            <LineEcharts v-bind="lineData"></LineEcharts>
          </template>
        </CodeCard>
      </ElCol>
      <ElCol :span="12">
        <CodeCard title="分类商品的收藏">
          <template #bottom>
            <BarEcharts v-bind="barData"></BarEcharts>
          </template>
        </CodeCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<style scoped lang="less">
.page-echarts {
  .content-row {
    margin-top: 10px;
  }
}
</style>
