/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-07 16:11:44
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-08 12:27:56
 */
import type { App, Directive } from 'vue'
// import permission from './permission/permission'
// import LongPress from './long-press/long-press'
// import debounce from './debounce/debounce'
// import throttle from './throttle/throttle'
import * as directives from './directive'

// const install = function (app: App<Element>) {
//   app.directive('permission', permission)
//   app.directive('longPress', LongPress)
//   app.directive('debounce', debounce)
//   app.directive('throttle', throttle)
// }

const install = function (app: App<Element>) {
  Object.keys(directives).forEach((key) => {
    //Object.keys() 返回一个数组，值是所有可遍历属性的key名
    //key是自定义指令名字；后面应该是自定义指令的值，值类型是string
    app.directive(key, (directives as { [key: string]: Directive })[key])
  })
}

export default install
