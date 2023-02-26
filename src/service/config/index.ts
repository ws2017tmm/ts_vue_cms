/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-11 10:25:39
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-26 16:29:28
 */
// const BASE_URL = 'http://codercba.com:9002'
let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'http://152.136.185.210:4000'
} else {
  // 开发环境
  BASE_URL = 'http://152.136.185.210:5000'
}
// const BASE_URL = import.meta.env.VITE_BASE_URL
// console.log(import.meta.env, '---import.meta')
const TIME_OUT = 10000

export { BASE_URL, TIME_OUT }
