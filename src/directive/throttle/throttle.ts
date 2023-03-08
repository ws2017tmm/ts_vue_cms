/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-08 12:06:40
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-08 13:38:33
 */
import type { ObjectDirective } from 'vue'
import _ from 'underscore'

/***
 *  节流 每单位时间可触发一次
 *  第一次瞬间触发，最后一次不管是否达到间隔时间依然触发
 * 【考虑到input的change事件】
 *  @param {?Number|300} time - 间隔时间
 *  @param {Function} fn - 执行事件
 *  @param {?String|"click"} event - 事件类型 例："click"
 *  @param {Array} binding.value - [fn,event,time]
 *  例：<el-button v-throttle="[reset,`click`,300]">刷新</el-button>
 *  传递参数则：<el-button v-throttle="[()=>reset(param),`click`,300]">刷新</el-button>
 */

const throttle: ObjectDirective = {
  mounted(el, binding) {
    const [fn, event = 'click', time = 300] = binding.value
    el.addEventListener(event, _.throttle(fn, time))
  }
}

// const throttle: ObjectDirective = {
//   mounted(el, binding) {
//     const [fn, event = 'click', time = 300] = binding.value
//     let timer: NodeJS.Timer | null = null
//     let timer_end: NodeJS.Timer
//     el.addEventListener(event, () => {
//       if (timer) {
//         clearTimeout(timer_end)
//         return (timer_end = setTimeout(() => fn(), time))
//       }
//       fn()
//       timer = setTimeout(() => (timer = null), time)
//     })
//   }
// }

export default throttle
