export interface ItopPanelDatasType {
  amount: string
  number1: number
  number2: number
  subtitle: string
  tips: string
  title: string
}

export interface ICategoryGoodsCountType {
  id: number
  name: string
  goodsCount: number
}

export type CategoryGoodsSaleType = ICategoryGoodsCountType

export interface ICategoryGoodsFavorType {
  id: number
  name: string
  goodsFavor: number
}
