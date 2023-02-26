/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-26 20:43:12
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-26 21:17:40
 */
import router from '../route'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  console.log(to, from, next, '---beforeEach')
  const token = localCache.getCache(LOGIN_TOKEN)
  if (token) {
    next()
  } else {
    if (to.path === '/login' || whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
