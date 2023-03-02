/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-02 11:25:30
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-02 11:26:45
 */
import wsRequest from '..'

export function getEntireRoles() {
  return wsRequest.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return wsRequest.post({
    url: '/department/list'
  })
}
