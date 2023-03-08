/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-08 10:59:36
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-08 13:37:57
 */
import type { ObjectDirective } from 'vue'
import _ from 'underscore'

/***
 * 防抖 单位时间只触发最后一次
 *  @param {?Number|300} time - 间隔时间
 *  @param {Function} fn - 执行事件
 *  @param {?String|"click"} event - 事件类型 例："click"
 *  @param {Array} binding.value - [fn,event,time]
 *  例：<el-button v-debounce="[reset,`click`,300]">刷新</el-button>
 *  也可简写成：<el-button v-debounce="[reset]">刷新</el-button>
 */
// const debounce: ObjectDirective = {
//   mounted(el, binding) {
//     const [fn, event = 'click', time = 300] = binding.value
//     let timer: NodeJS.Timer | null = null
//     el.addEventListener(event, () => {
//       timer && clearTimeout(timer)
//       timer = setTimeout(() => fn(), time)
//     })
//   }
// }

const debounce: ObjectDirective = {
  mounted(el, binding) {
    const [fn, event = 'click', time = 300] = binding.value
    el.addEventListener(event, _.debounce(fn, time))
  }
}

export default debounce
