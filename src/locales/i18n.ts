/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-08 15:16:38
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-08 16:18:13
 */
import { createI18n } from 'vue-i18n'

type LocaleType = {
  [key: string]: any
}
function loadLocalMessage() {
  // 1.读取config所有的ts文件
  const locales: Record<string, any> = import.meta.glob('./config/**/*.ts', {
    eager: true
  })
  const messages: LocaleType = {}
  for (const key in locales) {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      const module = locales[key]
      messages[locale] = module.default
    }
  }
  return messages
}

export { loadLocalMessage }

// 这是获取浏览器的语言
const language = (navigator.language || 'zh').toLocaleLowerCase()
const i18n = createI18n({
  locale: localStorage.getItem('lang') || language.split('-')[0] || 'zh', // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'zh', // 设置备用语言
  messages: loadLocalMessage()
})

export default i18n
