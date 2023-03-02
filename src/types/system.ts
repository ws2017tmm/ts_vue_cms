/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-02 10:31:47
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-02 11:01:18
 */
export interface ISystemUserQueryInfo {
  name: string
  realname: string
  cellphone: string
  enable: string
  createAt: string
  size: number
  offset: number
}

export interface ISystemState {
  userList: any[]
  usersTotalCount: number
}
