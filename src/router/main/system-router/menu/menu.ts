const menu = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/components/system/menu/menu.vue")

export default {
  path: "/main/system/menu",
  name: "menu",
  component: menu,
  children: [],
}
