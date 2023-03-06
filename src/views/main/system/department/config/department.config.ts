/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-03 09:15:55
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-06 10:32:50
 */
import {
  PAGE_NAME,
  PAGE_DESC,
  FORM_ITEM_TYPE,
  TABLE_COLUMN_TYPE
} from '@/global/constants'
const pageConfig = {
  pageName: PAGE_NAME.DEPARTMENT,
  pageDesc: PAGE_DESC.DEPARTMENT,
  searchConfig: {
    labelWidth: '80px',
    searchFormItems: [
      {
        type: FORM_ITEM_TYPE.INPUT,
        prop: 'name',
        label: '部门名称',
        placeholder: '请输入查询的部门名称'
      },
      {
        type: FORM_ITEM_TYPE.INPUT,
        prop: 'leader',
        label: '部门领导',
        placeholder: '请输入查询的领导名称'
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
      title: '部门列表',
      btnTitle: '新建部门'
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
        label: '部门名称',
        prop: 'name',
        width: '150px'
      },
      {
        tc_type: TABLE_COLUMN_TYPE.NORMAL,
        label: '部门领导',
        prop: 'leader',
        width: '180px'
      },
      {
        tc_type: TABLE_COLUMN_TYPE.NORMAL,
        label: '上级部门',
        prop: 'parentId',
        width: '150px'
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
