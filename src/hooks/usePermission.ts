import { useLoginStore } from "@/stores"

export function usePermission(pageName: string, handleName: string) {
  const loginStore = useLoginStore()
  const permissions = loginStore.permissions
  const verifyPermissions = `system:${pageName}:${handleName}`

  return !!permissions?.find((item) => item.indexOf(verifyPermissions))
}
