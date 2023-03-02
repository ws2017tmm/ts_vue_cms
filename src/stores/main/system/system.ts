/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-01 10:59:07
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-02 14:50:52
 */
import { defineStore } from 'pinia'

import type { ISystemUserQueryInfo, ISystemState } from '@/types'
import {
  getUsersListData,
  addNewUserData,
  editUserData,
  deleteUserById
} from '@/service/main/system/system'

const useSystemStore = defineStore({
  id: 'system',
  state: (): ISystemState => ({
    userList: [],
    usersTotalCount: 0
  }),
  actions: {
    async getUserListAction(queryInfo: ISystemUserQueryInfo) {
      const resultData = await getUsersListData(queryInfo)
      const { totalCount, list } = resultData.data
      this.usersTotalCount = totalCount
      this.userList = list
    },
    async addNewUserDataAction(userInfo: any) {
      // 1.创建新的用户
      await addNewUserData(userInfo)
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      await editUserData(id, userInfo)
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      await deleteUserById(id)
    }
  }
})

export default useSystemStore
