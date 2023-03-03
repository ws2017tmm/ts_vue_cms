/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-01 10:59:07
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-03 11:11:42
 */
import { defineStore } from 'pinia'

import type { ISystemUserQueryInfo, ISystemState } from '@/types'
import {
  getUsersListData,
  addNewUserData,
  editUserData,
  deleteUserById,
  getPageListData,
  deletePageById,
  addNewPageData,
  editPageData
} from '@/service/main/system/system'

const useSystemStore = defineStore({
  id: 'system',
  state: (): ISystemState => ({
    userList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    /** 针对 系统管理-用户管理的 增删改查 */
    // 查询用户的数据
    async getUserListAction(queryInfo: ISystemUserQueryInfo) {
      const resultData = await getUsersListData(queryInfo)
      const { totalCount, list } = resultData.data
      this.usersTotalCount = totalCount
      this.userList = list
    },
    // 创建新的用户
    async addNewUserDataAction(userInfo: any) {
      const newResult = await addNewUserData(userInfo)
      return newResult
    },
    // 更新用户的数据
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      return editResult
    },
    // 删除数据操作
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      return deleteResult
    },

    /** 针对 页面的 增删改查 */
    async getPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await getPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async addNewPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await addNewPageData(pageName, pageInfo)
      return newResult
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      return editResult
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      return deleteResult
    }
  }
})

export default useSystemStore
