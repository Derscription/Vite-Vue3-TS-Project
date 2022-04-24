import { echarts } from "./registerEcharts"
import type { ECOption } from "../type/codeEchartsType"

export default function useEcharts(el: HTMLElement) {
  const echartsInstance = echarts.init(el)

  const setOptions = (option: ECOption) => {
    echartsInstance.setOption(option)
  }

  // 给外部一个方法，用来更新图表大小
  const updateSize = () => {
    // 调用echart实例的resize方法，使图表随窗口大小的改变而改变
    echartsInstance.resize()
  }

  // 监听浏览器窗口大小是否发生改变
  window.addEventListener("resize", () => {
    // 调用echart实例的resize方法，使图表随窗口大小的改变而改变
    echartsInstance.resize()
  })

  return {
    echartsInstance,
    setOptions,
    updateSize,
  }
}
