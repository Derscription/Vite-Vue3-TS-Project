// service统一出口
import WestRequest from "./request/request"
import { BASE_URL, TIME_OUT } from "./request/config"
import localCache from "@/utils/cache"

import type { IWestRequestConfig } from "./request/requestType"

const config: IWestRequestConfig = {
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      let token = localCache.getCache("token")
      if (token) {
        config.headers!.Authorization = token
      }
      return config
    },
  },
}

const westRequest = new WestRequest(config)

export { westRequest }
