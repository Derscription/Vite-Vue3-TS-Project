<script setup lang="ts">
import type { ECOption } from "../../type/pageEchartsType"

const props = defineProps<{
  title?: string
  lineData: number[]
  xLabels: string[]
}>()

const option = computed<ECOption>(() => {
  return {
    title: {
      text: props.title ?? "",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { show: true },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    legend: {
      data: ["分类销量"],
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: props.xLabels,
      },
    ],
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "分类销量",
        type: "line",
        stack: "总量",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: props.lineData,
      },
    ],
  }
})
</script>

<template>
  <div class="line-echats">
    <CodeEcharts :options="option"></CodeEcharts>
  </div>
</template>

<style scoped lang="less"></style>
