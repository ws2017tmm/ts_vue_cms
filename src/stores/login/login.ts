/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-26 16:20:34
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-26 20:02:24
 */
import { defineStore } from 'pinia'

import type { IAccount } from '@/types'
import { accountLoginRequest } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    token: localCache.getCache(LOGIN_TOKEN) || ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 登录接口
      const result = await accountLoginRequest(account)
      this.token = result.data.token
      // 本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
    }
  }
})

export default useLoginStore
