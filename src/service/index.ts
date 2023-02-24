/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-10 23:59:46
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-11 18:47:51
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

const wsRequest = new WSRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
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
