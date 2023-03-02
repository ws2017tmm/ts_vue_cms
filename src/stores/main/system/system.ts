/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-01 10:59:07
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-02 11:03:41
 */
import { defineStore } from 'pinia'

import type { ISystemUserQueryInfo, ISystemState } from '@/types'
import { getUsersListData } from '@/service/main/system/system'

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
    }
  }
})

export default useSystemStore
