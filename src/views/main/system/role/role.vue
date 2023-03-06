<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 11:32:24
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-06 10:09:42
-->
<template>
  <div class="role">
    <page :page-config="pageConfig">
      <template #intro="scope">
        <span class="intro">测试-{{ scope.row[scope.prop] }}</span>
      </template>
    </page>
    <page-modal
      :modal-config="modalConfig"
      ref="modalRef"
      @edit-data="editData"
      @add-data="addData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import page from '@/components/common/page/page.vue'
import pageConfig from './config/role.config'
import PageModal from '@/components/common/modal/page-modal.vue'
import modalConfig from './config/modal.config'
import useSystemStore from '@/stores/main/system/system'

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

<style lang="less" scoped>
.role {
  color: #000;
  .intro {
    color: red;
  }
}
</style>
