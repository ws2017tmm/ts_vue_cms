/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-01 11:04:03
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-03 11:00:00
 */
import wsRequest from '@/service'

/** 系统管理-用户管理-的网络请求 */
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

/** 封装-页面的网络请求 增删改查 */
export function getPageListData(pageName: string, queryInfo: any) {
  return wsRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return wsRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function addNewPageData(pageName: string, pageInfo: any) {
  return wsRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return wsRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
