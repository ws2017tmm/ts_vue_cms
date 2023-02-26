/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-26 16:15:40
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-26 16:29:49
 */
import wsRequest from '..'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  return wsRequest.post({
    url: '/login',
    data: account
  })
}
