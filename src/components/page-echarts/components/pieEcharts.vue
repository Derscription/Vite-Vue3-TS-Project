<script setup lang="ts">
import type { ECOption, IEchartOptionsSeriesDataType } from "../../type/pageEchartsType"

const props = defineProps<{
  pieData: IEchartOptionsSeriesDataType[]
}>()

const option = computed<ECOption>(() => ({
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "horizontal",
    left: "left",
  },
  series: [
    {
      name: "分类数据",
      type: "pie",
      radius: "50%",
      data: props.pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
}))
</script>

<template>
  <div class="pir-echarts">
    <CodeEcharts :options="option"></CodeEcharts>
  </div>
</template>

<style scoped lang="less"></style>
