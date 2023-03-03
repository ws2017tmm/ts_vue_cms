/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-03 09:15:55
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-03 17:16:50
 */
import {
  PAGE_NAME,
  PAGE_DESC,
  FORM_ITEM_TYPE,
  TABLE_COLUMN_TYPE
} from '@/global/constants'
const pageConfig = {
  pageName: PAGE_NAME.ROLE,
  pageDesc: PAGE_DESC.ROLE,
  searchConfig: {
    labelWidth: '80px',
    searchFormItems: [
      {
        type: FORM_ITEM_TYPE.INPUT,
        prop: 'name',
        label: '角色名称',
        placeholder: '请输入查询的角色名称',
        initialValue: ''
      },
      {
        type: FORM_ITEM_TYPE.INPUT,
        prop: 'intro',
        label: '权限介绍',
        placeholder: '请输入查询的权限介绍'
      },
      {
        type: FORM_ITEM_TYPE.DATE_PICKER,
        prop: 'createAt',
        label: '创建时间',
        placeholder: '请选择'
      }
    ]
  },
  tableConfig: {
    header: {
      title: '角色列表',
      btnTitle: '新建角色'
    },
    tableList: [
      {
        type: TABLE_COLUMN_TYPE.SELECTION,
        prop: 'selection',
        label: '选择',
        width: '80px'
      },
      {
        type: TABLE_COLUMN_TYPE.INDEX,
        prop: 'index',
        label: '序号',
        width: '80px'
      },
      {
        type: TABLE_COLUMN_TYPE.NORMAL,
        label: '角色名称',
        prop: 'name',
        width: '150px'
      },
      {
        type: TABLE_COLUMN_TYPE.NORMAL,
        label: '权限介绍',
        prop: 'intro',
        width: '180px'
      },
      {
        type: TABLE_COLUMN_TYPE.CUSTOM,
        label: '测试',
        prop: 'intro',
        width: '150px',
        slotName: 'intro'
      },
      { type: TABLE_COLUMN_TYPE.TIMER, label: '创建时间', prop: 'createAt' },
      { type: TABLE_COLUMN_TYPE.TIMER, label: '更新时间', prop: 'updateAt' },
      {
        type: TABLE_COLUMN_TYPE.OPERATION,
        label: '操作',
        prop: 'operation',
        width: '150px'
      }
    ]
  }
}

export default pageConfig
