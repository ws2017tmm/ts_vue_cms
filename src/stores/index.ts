/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-23 20:26:41
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-28 13:05:06
 */
import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

function registerStore(app: App<Element>) {
  // 1.use的pinia
  app.use(pinia)

  // 2.加载本地的数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
