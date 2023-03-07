/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-07 14:10:55
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-07 15:05:53
 */
import { PAGE_NAME, PAGE_DESC, FORM_ITEM_TYPE } from '@/global/constants'
import type { IModalConfig } from '@/types'
const modalConfig: IModalConfig = {
  modalName: PAGE_NAME.USER,
  modalDesc: PAGE_DESC.USER,
  header: {
    addTitle: '新建用户',
    editTitle: '编辑用户'
  },
  formItems: [
    {
      type: FORM_ITEM_TYPE.INPUT,
      label: '用户名',
      prop: 'name',
      placeholder: '请输入用户名'
    },
    {
      type: FORM_ITEM_TYPE.INPUT,
      label: '真实姓名',
      prop: 'realname',
      placeholder: '请输入部门领导'
    },
    {
      type: FORM_ITEM_TYPE.INPUT,
      label: '密码',
      prop: 'password',
      placeholder: '请输入密码'
    },
    {
      type: FORM_ITEM_TYPE.INPUT,
      label: '手机号码',
      prop: 'cellphone',
      placeholder: '请输入手机号码'
    },
    {
      type: FORM_ITEM_TYPE.SELECT,
      label: '选择角色',
      prop: 'roleId',
      placeholder: '请选择角色',
      options: []
    },
    {
      type: FORM_ITEM_TYPE.SELECT,
      label: '选择部门',
      prop: 'departmentId',
      placeholder: '请选择部门',
      options: []
    }
  ]
}

export default modalConfig
