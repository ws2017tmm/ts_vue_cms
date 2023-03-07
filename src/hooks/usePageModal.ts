/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-07 14:00:39
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-07 14:01:40
 */
import { ref } from 'vue'
import type Page from '@/components/common/page/page.vue'

function usePageModal() {
  /** modal里面的新增/编辑成功 */
  const pageRef = ref<InstanceType<typeof Page>>()
  function handleconfirmSuccess() {
    pageRef.value?.fetchPageListData(true)
  }

  return {
    pageRef,
    handleconfirmSuccess
  }
}

export default usePageModal
