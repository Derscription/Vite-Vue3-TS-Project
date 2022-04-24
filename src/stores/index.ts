import useLoginStore from "./login/useLoginStore"
import useSystemStore from "./main/system/useSystemStore"
import useSystemRequestStore from "./main/system/useSystemReqeustStore"
import useDashBoardStore from "./main/analysis/useDashboardStore"
import useSearchStore from "./main/search/uesSearchStore"

export { useLoginStore, useSystemStore, useSystemRequestStore, useDashBoardStore, useSearchStore }

export function setupStore() {
  const loginStore = useLoginStore()
  loginStore.loadLocalLogin()
}
