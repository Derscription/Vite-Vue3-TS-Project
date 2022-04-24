<script setup lang="ts">
import { ECOption, IEchartOptionsSeriesDataType } from "../type/pageEchartsType"

import convertData from "../utils/convert-data"

const props = defineProps<{
  title?: string
  mapData: IEchartOptionsSeriesDataType[]
}>()

const option = computed<ECOption>(() => ({
  backgroundColor: "#fff",
  title: {
    text: props.title ?? "全国销量统计",
    left: "center",
    textStyle: {
      color: "#000000",
    },
  },
  tooltip: {
    trigger: "item",
    formatter: function (params: any) {
      return params.name + " : " + params.value[2]
    },
  },
  visualMap: {
    min: 0,
    max: 60000,
    left: 20,
    bottom: 20,
    calculable: true,
    text: ["高", "低"],
    inRange: {
      color: ["rgb(70, 240, 252)", "rgb(250, 220, 46)", "rgb(245, 38, 186)"],
    },
    textStyle: {
      color: "#000000",
    },
  },
  geo: {
    map: "china",
    roam: "scale",
    emphasis: {
      areaColor: "#f4cccc",
      borderColor: "rgb(9, 54, 95)",
      itemStyle: {
        areaColor: "#f4cccc",
      },
    },
  },
  series: [
    {
      name: "销量",
      type: "scatter",
      coordinateSystem: "geo",
      data: convertData(props.mapData),
      symbolSize: 12,
      emphasis: {
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },
      },
    },
    {
      type: "map",
      map: "china",
      geoIndex: 0,
      aspectScale: 0.75,
      tooltip: {
        show: false,
      },
    },
  ],
}))
</script>

<template>
  <div class="map-echarts">
    <CodeEcharts :options="option"></CodeEcharts>
  </div>
</template>

<style scoped lang="less"></style>
