/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-05 17:06:45
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-05 18:37:27
 */
import { PAGE_NAME } from '@/global/constants'
import type { IModalConfig } from '@/types'
const modalConfig: IModalConfig = {
  modalName: PAGE_NAME.DEPARTMENT,
  header: {
    addTitle: '新建部门',
    editTitle: '编辑部门'
  },
  formItems: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称'
    },
    {
      type: 'input',
      label: '部门领导',
      prop: 'leader',
      placeholder: '请输入部门领导'
    },
    {
      type: 'select',
      label: '上级部门',
      prop: 'parentId',
      placeholder: '请选择上级部门',
      options: []
    }
  ]
}

export default modalConfig
