const role = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/components/system/role/role.vue")

export default {
  path: "/main/system/role",
  name: "role",
  component: role,
  children: [],
}
