<script setup lang="ts">
import { CountUp } from "countup.js"
import type { CountUpOptions, CountUp as CountUpInstance } from "countup.js"

const props = defineProps<{
  count: number
  options?: CountUpOptions
}>()

const spanRef = ref<HTMLElement>()

// 默认的配置
const defineOptions: CountUpOptions = {
  duration: 2, // 持续时间
  decimalPlaces: 2, // 小数位数
  separator: ",", // 千位分割符
  decimal: ".", // 小数分割
  prefix: "￥", // 前缀
}

onMounted(() => {
  // countUp的实例
  let countUpInstance: CountUpInstance

  // 准备数据
  const options = { ...defineOptions, ...props.options }

  if (spanRef.value) {
    countUpInstance = new CountUp(spanRef.value, props.count, options)
    // 开始执行动画
    countUpInstance.start()
  }

  // 对数据进行监听，看是否有改变，如果有改变，则更新数据，重新执行动画
  watch(
    () => props.count,
    () => countUpInstance.update(props.count),
  )
})
</script>

<template>
  <div class="count-up">
    <span ref="spanRef"></span>
  </div>
</template>

<style scoped lang="less"></style>
