<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 11:32:24
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-09 14:28:45
-->
<template>
  <div class="role">
    <page
      :page-config="pageConfig"
      :other-param="otherParam"
      ref="pageRef"
      key="3"
      @add-new-click="handleAddNewClick"
      @edit-click="handleEditClick"
    >
      <template #intro="scope">
        <span class="intro">测试-{{ scope.row[scope.prop] }}</span>
      </template>
    </page>
    <page-modal
      :modal-config="modalConfig"
      :other-param="otherParam"
      ref="modalRef"
      @hidden="modalHidden"
      @confirm-success="handleconfirmSuccess"
    >
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
      /></template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
//系统
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'
// 页面
import page from '@/components/common/page/page.vue'
import pageConfig from './config/role.config'
import PageModal from '@/components/common/modal/page-modal.vue'
import modalConfig from './config/modal.config'
// store
// import useSystemStore from '@/stores/main/system/system'
import useMainStore from '@/stores/main/main'
//utils
import { mapMenuListToIds } from '@/utils/map-menus'
// hooks
import usePage from '@/hooks/usePage'
import usePageModal from '@/hooks/usePageModal'

// 逻辑关系--hook
const { modalRef, handleAddNewClick, handleEditClick } = usePage(
  pageConfig.pageName,
  pageConfig.pageDesc,
  handleModalData,
  editCallback
)
const { pageRef, handleconfirmSuccess } = usePageModal()

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

// refs
// const modalRef = ref<InstanceType<typeof PageModal>>()
const treeRef = ref<InstanceType<typeof ElTree>>()
const otherParam = ref()
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherParam.value = { menuList }
}
function modalHidden() {
  treeRef.value?.setCheckedKeys([])
}
function handleModalData(itemData: any) {
  const checkedIds = mapMenuListToIds(itemData.menuList)
  const data = { ...itemData, ...{ menuList: checkedIds } }
  return data
}
function editCallback(itemData: any) {
  nextTick(() => {
    const checkedIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(checkedIds)
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
