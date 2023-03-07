/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-26 17:32:51
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-07 14:35:16
 */

/**
 * 本地缓存
 */
const LOGIN_TOKEN = 'login/token'
const LOGIN_USERNAME = 'login/username'
const LOGIN_PASSWORD = 'login/password'
const LOGIN_REMEMBER_PASSWARD = 'login/remember/password'
const MAIN_USERINFO = 'main/user/info'
const MAIN_USERMENU = 'main/user/menu'

/**
 * page-name
 */
const PAGE_NAME = {
  USER: 'users',
  ROLE: 'role',
  DEPARTMENT: 'department',
  MENU: 'menu'
}
/**
 * page-name 对应的文字描述
 */
const PAGE_DESC = {
  USER: '用户',
  ROLE: '角色',
  DEPARTMENT: '部门',
  MENU: '菜单'
}

/**
 * 输入框的类型
 */
const FORM_ITEM_TYPE = {
  INPUT: 'input',
  SELECT: 'select',
  DATE_PICKER: 'date-picker',
  CUSTOM: 'custom'
}

/**
 * table-column的类型
 */
const TABLE_COLUMN_TYPE = {
  TIMER: 'timer',
  INDEX: 'index',
  OPERATION: 'operation',
  CUSTOM: 'customer',
  NORMAL: 'normal',
  SELECTION: 'selection'
}

export {
  LOGIN_TOKEN,
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
  LOGIN_REMEMBER_PASSWARD,
  MAIN_USERINFO,
  MAIN_USERMENU,
  PAGE_NAME,
  PAGE_DESC,
  FORM_ITEM_TYPE,
  TABLE_COLUMN_TYPE
}
