/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-06 16:33:07
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-07 14:05:57
 */
import { ref } from 'vue'
import type PageModal from '@/components/common/modal/page-modal.vue'

type EditCallbackFnType = (data?: any) => void
type ModalDataFnType = (data?: any) => any

function usePage(
  pageName: string,
  pageDesc: string,
  handleModalData?: ModalDataFnType,
  editCallback?: EditCallbackFnType
) {
  // refs
  const modalRef = ref<InstanceType<typeof PageModal>>()

  /** page里面的新增和编辑 */
  function handleAddNewClick() {
    modalRef.value?.show(true)
  }
  function handleEditClick(itemData: any) {
    if (handleModalData) {
      const data = handleModalData(itemData)
      modalRef.value?.show(false, data)
    } else {
      modalRef.value?.show(false, itemData)
    }
    editCallback && editCallback(itemData)
  }

  return {
    modalRef,
    handleAddNewClick,
    handleEditClick
  }
}

export default usePage
