/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-01 11:04:03
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-01 11:05:15
 */
import wsRequest from '@/service'

/** 用户的网络请求 */
export function getUsersListData(data: any) {
  return wsRequest.post({
    url: '/users/list',
    data
  })
}
