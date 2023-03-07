<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-07 14:11:15
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-07 15:11:28
-->
<template>
  <div class="user">
    <page
      :page-config="pageConfig"
      ref="pageRef"
      @add-new-click="handleAddNewClick"
      @edit-click="handleEditClick"
    >
      <!-- 作用域插槽 -->
      <template #enable="scope">
        <el-button
          size="small"
          :type="scope.row.enable ? 'primary' : 'danger'"
          plain
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page>
    <page-modal
      :modal-config="modalConfigRef"
      ref="modalRef"
      @confirm-success="handleconfirmSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import Page from '@/components/common/page/page.vue'
import PageModal from '@/components/common/modal/page-modal.vue'
import pageConfig from './c-cpns/user.config'
import modalConfig from './c-cpns/modal.config'

import useMainStore from '@/stores/main/main'

// hooks
import usePage from '@/hooks/usePage'
import usePageModal from '@/hooks/usePageModal'

// 设置modal里选项的值
const mainStore = useMainStore()
const modalConfigRef = computed(() => {
  const roles = mainStore.entireRoles.map((item) => {
    return { label: item.name, value: item.id }
  })
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'roleId') {
      item.options?.push(...roles)
    }
    if (item.prop === 'departmentId') {
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
.user {
  color: #000;
}
</style>
