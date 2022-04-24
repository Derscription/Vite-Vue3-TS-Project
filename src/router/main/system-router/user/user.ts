const user = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/components/system/user/user.vue")

export default {
  path: "/main/system/user",
  name: "user",
  component: user,
  children: [],
}
