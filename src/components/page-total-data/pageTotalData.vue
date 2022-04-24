<script setup lang="ts">
import { useDashBoardStore } from "@/stores"
import type { CountUpOptions } from "countup.js"

// 获取顶部面板数据
const dashboardStore = useDashBoardStore()
const { topPanelDatas } = storeToRefs(dashboardStore)

const countUpOptions1: CountUpOptions = {
  prefix: "￥", // 前缀
  decimalPlaces: 0, // 小数位数
}
const countUpOptions2: CountUpOptions = {
  prefix: "",
  decimalPlaces: 0,
}

const useOptions = (name: string) => (name === "saleroom" ? countUpOptions1 : countUpOptions2)
</script>

<template>
  <div class="page-total-data">
    <ElRow :gutter="10">
      <template v-for="item of topPanelDatas" :key="item.title">
        <ElCol :md="12" :lg="6" :xl="6">
          <CodeCard
            :title="item.title"
            :item-style="{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '14px' }"
            class="code-card"
          >
            <!-- 标题右侧符号内容 -->
            <template #headerRight>
              <ElTooltip :content="item.tips" effect="light" placement="top">
                <ElIcon class="warning-color"><warning /></ElIcon>
              </ElTooltip>
            </template>

            <!-- 中间数据展示部分 -->
            <template #content>
              <CodeCountUp
                :count="item.number1"
                :options="useOptions(item.amount)"
                class="page-count-up"
              ></CodeCountUp>
            </template>

            <!-- 尾部 -->
            <template #bottom>
              <span class="card-bottom">
                {{ item.subtitle }}:
                <CodeCountUp
                  :count="item.number2"
                  :options="useOptions(item.amount)"
                  class="card-bottom-data"
                ></CodeCountUp
              ></span>
            </template>
          </CodeCard>
        </ElCol>
      </template>
    </ElRow>
  </div>
</template>

<style scoped lang="less">
.page-total-data {
  margin-bottom: 10px;

  .warning-color {
    color: rgba(0, 0, 0, 0.45);
  }

  .page-count-up {
    font-size: 26px;
    display: flex;
  }

  .card-bottom {
    display: flex;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 0;

    .card-bottom-data {
      margin-left: 8px;
    }
  }
}

::v-deep .code-card {
  .el-card__body {
    padding: 10px 20px;

    .item {
      margin-bottom: 0;
    }
  }
}
</style>
