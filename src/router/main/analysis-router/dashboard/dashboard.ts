const dashboard = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/components/analysis/dashboard/dashboard.vue")

export default {
  path: "/main/analysis/dashboard",
  name: "dashboard",
  component: dashboard,
  children: [],
}
