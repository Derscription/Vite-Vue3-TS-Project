const goods = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/components/product/goods/cargo.vue")

export default {
  path: "/main/product/goods",
  name: "goods",
  component: goods,
  children: [],
}
