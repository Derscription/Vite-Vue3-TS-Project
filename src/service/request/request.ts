import axios from "axios"
import { ElLoading } from "element-plus"

import type { AxiosInstance } from "axios"
import type { IWestRequestConfig, IWestRequestInterceptors } from "./requestType"
import type { ILoadingInstance } from "element-plus/es/components/loading/index"

const DEFAULT_LOADING = true

class WestReqeust {
  public instance: AxiosInstance
  public interceptors?: IWestRequestInterceptors
  public loading!: ILoadingInstance
  public showLoading: boolean

  constructor(config: IWestRequestConfig, allIntercetpors: boolean = true) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // * 请求拦截器后添加的先执行，响应拦截器先添加的先执行
    // 从config中取出的拦截器是对应的实例的拦截器
    if (config.interceptors) {
      this.interceptors = config.interceptors

      this.instance.interceptors.request.use(
        this.interceptors?.requestInterceptor,
        this.interceptors?.requestInterceptorCatch,
      )

      this.instance.interceptors.response.use(
        this.interceptors?.responseInterceptor,
        this.interceptors?.responseInterceptorCache,
      )
    }

    // 添加所有的实例都有的拦截器
    if (allIntercetpors) {
      this.instance.interceptors.request.use(
        (config) => {
          if (this.showLoading) {
            this.loading = ElLoading.service({
              lock: true,
              text: "正在请求数据...",
              background: "rgba(0,0,0,0.5)",
            })
          }

          return config
        },
        (error) => {
          // 将loading移除
          this.loading?.close()

          return error
        },
      )
      this.instance.interceptors.response.use(
        (res) => {
          // 将loading移除
          this.loading?.close()

          return res.data
        },
        (error) => {
          // 将loading移除
          this.loading?.close()

          return error
        },
      )
    }
  }

  public request<T>(config: IWestRequestConfig<T>) {
    return new Promise<T>((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1..单个请求对数据和处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 2.将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果返回出去
          resolve(res)
        })
        .catch((error) => {
          this.showLoading = DEFAULT_LOADING
          reject(error)
          return error
        })
    })
  }

  get<T>(config: IWestRequestConfig<T>) {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T>(config: IWestRequestConfig<T>) {
    return this.request<T>({ ...config, method: "POST" })
  }

  delete<T>(config: IWestRequestConfig<T>) {
    return this.request<T>({ ...config, method: "DELETE" })
  }

  patch<T>(config: IWestRequestConfig<T>) {
    return this.request<T>({ ...config, method: "PATCH" })
  }
}

export default WestReqeust
