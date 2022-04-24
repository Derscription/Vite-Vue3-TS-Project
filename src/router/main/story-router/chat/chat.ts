const chat = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/components/story/chat/chat.vue")

export default {
  path: "/main/story/chat",
  name: "chat",
  component: chat,
  children: [],
}
