/*
 * @Description: /*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-03 09:15:55
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-07 14:41:01
 */
import {
  PAGE_NAME,
  PAGE_DESC,
  FORM_ITEM_TYPE,
  TABLE_COLUMN_TYPE
} from '@/global/constants'

const pageConfig = {
  pageName: PAGE_NAME.USER,
  pageDesc: PAGE_DESC.USER,
  searchConfig: {
    labelWidth: '80px',
    searchFormItems: [
      {
        type: FORM_ITEM_TYPE.INPUT,
        prop: 'name',
        label: '用户名',
        placeholder: '请输入查询的用户名'
      },
      {
        type: FORM_ITEM_TYPE.INPUT,
        prop: 'realname',
        label: '真实姓名',
        placeholder: '请输入查询的真实姓名'
      },
      {
        type: FORM_ITEM_TYPE.INPUT,
        prop: 'cellphone',
        label: '手机号码',
        placeholder: '请输入查询的手机号码'
      },
      {
        type: FORM_ITEM_TYPE.SELECT,
        prop: 'enable',
        label: '状态',
        placeholder: '请选择状态',
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      },
      {
        type: FORM_ITEM_TYPE.DATE_PICKER,
        prop: 'createAt',
        label: '创建时间'
      }
    ]
  },
  tableConfig: {
    header: {
      title: '用户列表',
      btnTitle: '新建用户'
    },
    tableList: [
      {
        tc_type: TABLE_COLUMN_TYPE.SELECTION,
        prop: 'selection',
        label: '选择',
        width: '80px'
      },
      {
        tc_type: TABLE_COLUMN_TYPE.INDEX,
        prop: 'index',
        label: '序号',
        width: '80px'
      },
      {
        tc_type: TABLE_COLUMN_TYPE.NORMAL,
        label: '手机号码',
        prop: 'cellphone',
        width: '150px'
      },
      {
        tc_type: TABLE_COLUMN_TYPE.NORMAL,
        label: '真实姓名',
        prop: 'realname',
        width: '180px'
      },
      {
        tc_type: TABLE_COLUMN_TYPE.CUSTOM,
        label: '状态',
        prop: 'enable',
        width: '150px',
        slotName: 'enable'
      },
      { tc_type: TABLE_COLUMN_TYPE.TIMER, label: '创建时间', prop: 'createAt' },
      { tc_type: TABLE_COLUMN_TYPE.TIMER, label: '更新时间', prop: 'updateAt' },
      {
        tc_type: TABLE_COLUMN_TYPE.OPERATION,
        label: '操作',
        prop: 'operation',
        width: '150px'
      }
    ]
  }
}

export default pageConfig
