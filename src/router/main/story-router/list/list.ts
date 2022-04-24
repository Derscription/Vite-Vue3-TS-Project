const list = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/components/story/list/list.vue")

export default {
  path: "/main/story/list",
  name: "list",
  component: list,
  children: [],
}
