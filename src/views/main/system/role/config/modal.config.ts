/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-06 10:00:33
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-06 15:18:59
 */
import { PAGE_NAME, FORM_ITEM_TYPE } from '@/global/constants'
const modalConfig = {
  modalName: PAGE_NAME.ROLE,
  header: {
    addTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      type: FORM_ITEM_TYPE.INPUT,
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称'
    },
    {
      type: FORM_ITEM_TYPE.INPUT,
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入权限介绍'
    },
    {
      type: FORM_ITEM_TYPE.CUSTOM,
      label: '菜单',
      prop: 'menuList',
      slotName: 'menuList'
    }
  ]
}

export default modalConfig
