/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-06 09:43:10
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-06 10:46:28
 */
import { PAGE_NAME, PAGE_DESC, TABLE_COLUMN_TYPE } from '@/global/constants'
const pageConfig = {
  pageName: PAGE_NAME.MENU,
  pageDesc: PAGE_DESC.DEPARTMENT,
  tableConfig: {
    header: {
      title: '菜单列表'
    },
    tableList: [
      {
        tc_type: TABLE_COLUMN_TYPE.NORMAL,
        label: '菜单名称',
        prop: 'name',
        width: '180px'
      },
      {
        tc_type: TABLE_COLUMN_TYPE.NORMAL,
        label: '级别',
        prop: 'type',
        width: '120px'
      },
      {
        tc_type: TABLE_COLUMN_TYPE.NORMAL,
        label: '菜单url',
        prop: 'url',
        width: '200px'
      },
      {
        tc_type: TABLE_COLUMN_TYPE.NORMAL,
        label: '菜单icon',
        prop: 'icon',
        width: '200px'
      },
      {
        tc_type: TABLE_COLUMN_TYPE.NORMAL,
        label: '排序',
        prop: 'sort',
        width: '120px'
      },
      {
        tc_type: TABLE_COLUMN_TYPE.NORMAL,
        label: '权限',
        prop: 'permission',
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
    ],
    childrenTree: {
      rowKey: 'id',
      treeProps: {
        children: 'children'
      }
    }
  }
}

export default pageConfig
