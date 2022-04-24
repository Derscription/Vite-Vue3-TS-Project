import { westRequest } from "@/service"

enum DashboardAPI {
  amountList = "/goods/amount/list",
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
}

type DashboardDataType<T = any> = {
  code: number
  data: T
}

export function getCategoryGoodsCount<T = any>() {
  return westRequest.get<DashboardDataType<T>>({
    url: DashboardAPI.categoryGoodsCount,
  })
}

export function getCategoryGoodsSale<T = any>() {
  return westRequest.get<DashboardDataType<T>>({
    url: DashboardAPI.categoryGoodsSale,
  })
}

export function getCategoryGoodsFavor<T = any>() {
  return westRequest.get<DashboardDataType<T>>({
    url: DashboardAPI.categoryGoodsFavor,
  })
}

export function getAmountList<T = any>() {
  return westRequest.get<DashboardDataType<T>>({
    url: DashboardAPI.amountList,
  })
}
