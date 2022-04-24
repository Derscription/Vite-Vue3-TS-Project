const category = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/components/product/category/category.vue")

export default {
  path: "/main/product/category",
  name: "category",
  component: category,
  children: [],
}
