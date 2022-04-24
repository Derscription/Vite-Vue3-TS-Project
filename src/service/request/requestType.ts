import type { AxiosRequestConfig, AxiosResponse } from "axios"

export interface IWestRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCache?: (error: any) => any
}

export interface IWestRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IWestRequestInterceptors<T>
  showLoading?: boolean
}

export interface IResponseData<T> {
  code: number
  data: T
}
