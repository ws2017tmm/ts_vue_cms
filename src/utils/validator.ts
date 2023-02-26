/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2020-06-10 10:02:46
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-26 18:47:50
 */

const isEmptyInputValue = function (value: string) {
  return value === null || value.length === 0
}

const isEmptyInputValueTrim = function (value: string) {
  if (value) {
    return value.trim().length === 0
  } else {
    return value === null || value.length === 0
  }
}

const regExpValidate = function (
  regText: string | Array<string>,
  value: string
) {
  if (regText instanceof Array) {
    return regText.every((regT) => {
      const reg = new RegExp(regT)
      return value === null ? false : reg.test(value.toString())
    })
  } else {
    const reg = new RegExp(regText)
    return value === null ? false : reg.test(value.toString())
  }
}

const getValidatorObject = function (
  req: string | Array<string>,
  value: string
) {
  if (isEmptyInputValue(value) || regExpValidate(req, value)) {
    return true
  } else {
    return false
  }
}

const getCharLength = function (value: string) {
  if (value) {
    let charLength = 0
    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i)
      if (charCode > 127 || charCode === 94) {
        charLength += 2
      } else {
        charLength++
      }
    }
    return charLength
  } else {
    return 0
  }
}

// 正则表达式
const validatorRegExp = {
  username: '^[a-zA-Z0-9_-]{4,16}$', // 4到16位（字母，数字，下划线，减号）
  // password: '^.*(?=.{6,})(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$', //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
  password: '^.{3,6}$',
  english: '^[a-zA-Z]', // 英文
  positive17Money: '^[+]?([1-9]\\d{θ,16}|@)(\\.\\d{1,2})?$' // 17位正整数（最多支持两位小数）
  // positiveMoney: '^(([+]?(\\d{θ,20}))|@)(\1. \\d{1,2})?$
}

export default {
  name: 'validator',

  isEmpty: function (value: string) {
    return isEmptyInputValue(value)
  },
  isEmptyTrim: function (value: string) {
    return isEmptyInputValueTrim(value)
  },
  isEnglish: function (value: string) {
    return regExpValidate(validatorRegExp.english, value)
  },
  // required:function(message = i18n.t('validator.requiredError')) {
  required: function (message = '此为必填项') {
    return (value: string) => {
      if (this.isEmpty(value)) {
        return message
      } else {
        return true
      }
    }
  },
  requiredNoWhiteSpace: function (message = '此为必填项') {
    return (rule: any, value: any, callback: any) => {
      if (this.isEmptyTrim(value)) {
        callback(new Error(message))
      } else {
        callback()
      }
    }
  },
  username: function (message = '请输入正确的用户名') {
    return (rule: any, value: any, callback: any) => {
      // if (this.isEnglish(value)){
      if (getValidatorObject(validatorRegExp.username, value)) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
  },
  password: function (message = '请输入正确的密码') {
    return (rule: any, value: any, callback: any) => {
      // if (this.isEnglish(value)){
      if (getValidatorObject(validatorRegExp.password, value)) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
  },
  english: function (message = '请输入英文') {
    return (rule: any, value: any, callback: any) => {
      // if (this.isEnglish(value)){
      if (getValidatorObject(validatorRegExp.english, value)) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
  },
  positiveMoney: function (message = '17位正整数(最多支持两位小数)') {
    return (rule: any, value: any, callback: any) => {
      if (value === null || value === undefined) {
        callback()
        return
      }
      const money = value.replace(/,/g, '')
      if (getValidatorObject(validatorRegExp.positive17Money, money)) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
  },
  maxLength: function (message: string, length: number) {
    if (!length) {
      length = Number(message)
      message = `最大长度为${length}位字符`
    }
    return (rule: any, value: any, callback: any) => {
      const vLength = this.isEmpty(value) ? 0 : value.length
      if (Number(vLength) > Number(length)) {
        callback(new Error(message))
      } else {
        callback()
      }
    }
  },
  charLength: function (message: string, length: number) {
    if (length) {
      length = Number(message)
      message = `最大长度为${length}位字符`
    }
    return (rule: any, value: any, callback: any) => {
      const charLength = getCharLength(value)
      if (Number(charLength) > Number(length)) {
        callback(new Error(message))
      } else {
        callback()
      }
    }
  }
}
