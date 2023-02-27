/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-10 23:59:46
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-27 10:45:24
 */
/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-10 23:59:46
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-11 11:34:58
 */
import { BASE_URL, TIME_OUT } from './config'
import WSRequest from './request'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const wsRequest = new WSRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessCallback: (config) => {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        // 类型缩小
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

// export const wsRequest2 = new WSRequest({
//   baseURL: BASE_URL,
//   timeout: TIME_OUT,
//   interceptors: {
//     requestSuccessCallback: (config) => {
//       return config
//     }
//   }
// })

export default wsRequest
