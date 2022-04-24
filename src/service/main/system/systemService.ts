import { westRequest } from "@/service"

export function getPageListData<T>(url: string, queryInfo: any, showLoading: boolean = true) {
  return westRequest.post<T>({
    url,
    data: queryInfo,
    showLoading,
  })
}

// url: /users/id
export function deletePageData<T>(url: string) {
  return westRequest.delete<T>({
    url,
  })
}

export function createPageData<T>(url: string, newData: any) {
  return westRequest.post<T>({
    url,
    data: newData,
  })
}

export function editPageData<T>(url: string, editData: any) {
  return westRequest.patch<T>({
    url,
    data: editData,
  })
}
