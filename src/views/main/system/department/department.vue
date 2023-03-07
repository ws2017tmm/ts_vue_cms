<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 11:32:09
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-07 15:17:58
-->
<template>
  <div class="department">
    <page
      :page-config="pageConfig"
      ref="pageRef"
      @add-new-click="handleAddNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal
      :modal-config="modalConfigRef"
      ref="modalRef"
      @confirm-success="handleconfirmSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import page from '@/components/common/page/page.vue'
import PageModal from '@/components/common/modal/page-modal.vue'
import pageConfig from './config/department.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/stores/main/main'

// hooks
import usePage from '@/hooks/usePage'
import usePageModal from '@/hooks/usePageModal'

// 设置modal里选项的值
const mainStore = useMainStore()
const modalConfigRef = computed(() => {
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})

// 逻辑关系--hook
const { modalRef, handleAddNewClick, handleEditClick } = usePage(
  pageConfig.pageName,
  pageConfig.pageDesc
)
const { pageRef, handleconfirmSuccess } = usePageModal()
</script>

<style scoped>
.department {
  color: #000;
}
</style>
