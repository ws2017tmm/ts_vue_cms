/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-07 16:11:44
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-07 16:15:56
 */
import type { App } from 'vue'
import permission from './permission/permission'

const install = function (app: App<Element>) {
  app.directive('permission', permission)
}

export default install
