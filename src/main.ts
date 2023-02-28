/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-23 20:26:41
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-28 11:49:58
 */
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores'

import 'normalize.css'
import './assets/css/index.less'

import icons from './global/register-icons'

const app = createApp(App)
app.use(icons)
app.use(store)
app.use(router)

app.mount('#app')
