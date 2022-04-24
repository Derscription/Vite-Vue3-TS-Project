const overview = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/components/analysis/overview/overview.vue")

export default {
  path: "/main/analysis/overview",
  name: "overview",
  component: overview,
  children: [],
}
