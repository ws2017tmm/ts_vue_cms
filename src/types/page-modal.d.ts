/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-05 18:33:49
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-05 18:38:06
 */
interface IFormType {
  type: string
  prop: string
  label: string
  placeholder?: string
  initialValue?: string
  options?: any[]
}
export interface IModalConfig {
  modalName: string
  header: {
    addTitle: string
    editTitle: string
  }
  formItems: IFormType[]
}

export interface IModalProps {
  modalConfig: {
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
}
