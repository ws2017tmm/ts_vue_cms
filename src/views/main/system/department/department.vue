<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 11:32:09
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-05 19:33:08
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
      @edit-data="editData"
      @add-data="addData"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import page from '@/components/common/page/page.vue'
import PageModal from '@/components/common/modal/page-modal.vue'
import pageConfig from './config/department.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/stores/main/main'
import useSystemStore from '@/stores/main/system/system'

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
const modalRef = ref<InstanceType<typeof PageModal>>()
/** page里面的新增和编辑 */
function handleAddNewClick() {
  modalRef.value?.show(true)
}
function handleEditClick(itemData: any) {
  modalRef.value?.show(false, itemData)
}
/** modal里面的新增和编辑 */
const pageRef = ref<InstanceType<typeof page>>()
const systemStore = useSystemStore()
function addData(formData: any) {
  systemStore.addNewPageDataAction(pageConfig.pageName, formData).then(() => {
    ElMessage.success(`新增${pageConfig.pageDesc}信息成功`)
    pageRef.value?.fetchPageListData(true)
  })
}
function editData(id: number, formData: any) {
  systemStore.editPageDataAction(pageConfig.pageName, id, formData).then(() => {
    ElMessage.success(`编辑${pageConfig.pageDesc}信息成功`)
    pageRef.value?.fetchPageListData()
  })
}
</script>

<style scoped>
.department {
  color: #000;
}
</style>
