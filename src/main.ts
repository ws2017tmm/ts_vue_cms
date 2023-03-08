/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-23 20:26:41
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-08 16:20:03
 */
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores'
import i18n from './locales/i18n'

import 'normalize.css'
import './assets/css/index.less'

import icons from './global/register-icons'
import directive from './directive'

const app = createApp(App)
app.use(icons)
app.use(store)
app.use(router)
app.use(i18n)
app.use(directive)

app.mount('#app')
