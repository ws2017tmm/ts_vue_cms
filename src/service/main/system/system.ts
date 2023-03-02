/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-01 11:04:03
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-02 14:51:28
 */
import wsRequest from '@/service'

/** 用户的网络请求 */
export function getUsersListData(data: any) {
  return wsRequest.post({
    url: '/users/list',
    data
  })
}

export function addNewUserData(userInfo: any) {
  return wsRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return wsRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

export function deleteUserById(id: number) {
  return wsRequest.delete({
    url: `/users/${id}`
  })
}
