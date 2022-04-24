<script setup lang="ts">
import type { ECOption, IEchartOptionsSeriesDataType } from "../../type/pageEchartsType"

const props = defineProps<{
  roseData: IEchartOptionsSeriesDataType[]
}>()

const option = computed<ECOption>(() => ({
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "bottom",
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: "类别数据",
      type: "pie",
      radius: [10, 100],
      center: ["50%", "50%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 8,
      },
      data: props.roseData,
    },
  ],
}))
</script>

<template>
  <div class="rose-echarts">
    <CodeEcharts :options="option"></CodeEcharts>
  </div>
</template>

<style scoped lang="less"></style>
