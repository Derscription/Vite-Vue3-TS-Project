const department = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/components/system/department/department.vue")

export default {
  path: "/main/system/department",
  name: "department",
  component: department,
  children: [],
}
