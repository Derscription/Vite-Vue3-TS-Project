<script setup lang="ts">
import useEcharts from "./hooks/useEcharts"
import type { ECOption, CSSProperties } from "./type/codeEchartsType"

const props = withDefaults(
  defineProps<{
    options: ECOption
    style?: CSSProperties
  }>(),
  {
    style: () => ({
      width: "100%",
      height: "360px",
    }),
  },
)

const echartsRef = ref<HTMLElement>()

onMounted(() => {
  if (echartsRef.value) {
    const { echartsInstance, setOptions } = useEcharts(echartsRef.value)
    watchEffect(() => setOptions(props.options))
  }
})
</script>

<template>
  <div class="echarts">
    <div ref="echartsRef" :style="props.style"></div>
  </div>
</template>

<style scoped lang="less"></style>
