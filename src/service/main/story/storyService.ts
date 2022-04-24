import { westRequest } from "@/service"

type createStoryDataType = { title: string; content: string }

export function createStoryData(url: string, value: createStoryDataType) {
  return westRequest.post<{ data: string; code: number }>({
    url,
    data: value,
  })
}
