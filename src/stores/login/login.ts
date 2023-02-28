/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-26 16:20:34
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-28 13:09:21
 */
import { defineStore } from 'pinia'

import type { IAccount } from '@/types'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN, MAIN_USERINFO, MAIN_USERMENU } from '@/global/constants'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
}

const useLoginStore = defineStore({
  id: 'login',
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) || '',
    userInfo: localCache.getCache(MAIN_USERINFO) || {},
    userMenus: localCache.getCache(MAIN_USERMENU) || []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 登录接口
      const result = await accountLoginRequest(account)
      this.token = result.data.token
      const id = result.data.id

      // 本地缓存token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 根据登录返回的id请求用户详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 进行本地缓存
      localCache.setCache(MAIN_USERINFO, userInfo)
      localCache.setCache(MAIN_USERMENU, userMenus)

      // 动态路由
      // 加载所有的路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))
    },
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(MAIN_USERINFO)
      const userMenus = localCache.getCache(MAIN_USERMENU)
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 2.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
