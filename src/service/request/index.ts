/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-11 10:13:41
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-17 09:08:51
 */
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { WSAxiosRequestConfig } from './type'

class WSRequest {
  instance: AxiosInstance
  constructor(config: WSAxiosRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    // 请求前拦截
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    // 响应前拦截
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 单个reques实例的单独拦截器
    // 请求
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessCallback,
      config.interceptors?.requestFailureCallback
    )
    // 响应
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessCallback,
      config.interceptors?.responseFailureCallback
    )
  }
  // 每一个单独的请求可以设置拦截器
  request<T = any>(config: WSAxiosRequestConfig<T>) {
    // 单次请求前的拦截处理
    // if (config.interceptors?.requestSuccessCallback) {
    //   config = config.interceptors.requestSuccessCallback(config)
    // }
    return new Promise<T>((resolve, reject) => {
      // 单次响应的成功拦截处理
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessCallback) {
            res = config.interceptors.responseSuccessCallback(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: WSAxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: WSAxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  put<T = any>(config: WSAxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
  delete<T = any>(config: WSAxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: WSAxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default WSRequest
