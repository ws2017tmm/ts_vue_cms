/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-02 11:26:05
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-07 16:56:22
 */
import { defineStore } from 'pinia'
import {
  getEntireDepartments,
  getEntireRoles,
  getEntireMenus
} from '@/service/main/main'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentsResult = await getEntireDepartments()
      const menuResult = await getEntireMenus()

      // 保存数据
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentsResult.data.list
      this.entireMenus = menuResult.data.list
    }
  }
})

export default useMainStore
