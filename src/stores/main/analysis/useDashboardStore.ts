import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
} from "@/service/main/analysis/dashboardService"

import type {
  ItopPanelDatasType,
  ICategoryGoodsCountType,
  CategoryGoodsSaleType,
  ICategoryGoodsFavorType,
} from "@/stores/types"

const useDashBoardStore = defineStore("dashboardStore", () => {
  const topPanelDatas = ref<ItopPanelDatasType[]>([])
  const categoryGoodsCount = ref<ICategoryGoodsCountType[]>([])
  const categoryGoodsSale = ref<CategoryGoodsSaleType[]>([])
  const categoryGoodsFavor = ref<ICategoryGoodsFavorType[]>([])

  // * Getters

  // * Action
  const getDashboardDataAction = async () => {
    try {
      const categoryCountResult = await getCategoryGoodsCount<ICategoryGoodsCountType[]>()
      categoryGoodsCount.value = categoryCountResult.data

      const categorySaleResult = await getCategoryGoodsSale<CategoryGoodsSaleType[]>()
      categoryGoodsSale.value = categorySaleResult.data

      const categoryFavorResult = await getCategoryGoodsFavor<ICategoryGoodsFavorType[]>()
      categoryGoodsFavor.value = categoryFavorResult.data

      const topPanelResult = await getAmountList<ItopPanelDatasType[]>()
      topPanelDatas.value = topPanelResult.data
    } catch (error) {
      ElMessage({
        type: "error",
        message: "请求数据失败!",
        duration: 1000,
        showClose: true,
      })
    }
  }

  return {
    topPanelDatas,
    categoryGoodsCount,
    categoryGoodsSale,
    categoryGoodsFavor,

    getDashboardDataAction,
  }
})

export default useDashBoardStore
