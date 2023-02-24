/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-24 17:17:36
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-24 17:27:02
 */
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'

function registerIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default registerIcons
