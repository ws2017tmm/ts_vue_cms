<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 11:32:24
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-06 16:29:41
-->
<template>
  <div class="role">
    <page
      :page-config="pageConfig"
      ref="pageRef"
      @add-new-click="handleAddNewClick"
      @edit-click="handleEditClick"
    >
      <template #intro="scope">
        <span class="intro">测试-{{ scope.row[scope.prop] }}</span>
      </template>
    </page>
    <page-modal
      :modal-config="modalConfig"
      ref="modalRef"
      @edit-data="editData"
      @add-data="addData"
      @hidden="modalHidden"
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
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'

import page from '@/components/common/page/page.vue'
import pageConfig from './config/role.config'
import PageModal from '@/components/common/modal/page-modal.vue'
import modalConfig from './config/modal.config'

import useSystemStore from '@/stores/main/system/system'
import useMainStore from '@/stores/main/main'

import { mapMenuListToIds } from '@/utils/map-menus'

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

// refs
const modalRef = ref<InstanceType<typeof PageModal>>()
const treeRef = ref<InstanceType<typeof ElTree>>()

let checkedTreeData = ref()
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  checkedTreeData.value = { menuList }
}

/** page里面的新增和编辑 */
function handleAddNewClick() {
  modalRef.value?.show(true)
}
function handleEditClick(itemData: any) {
  modalRef.value?.show(false, itemData)
  nextTick(() => {
    const checkedIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(checkedIds)
  })
}

/** modal里面的新增/编辑/隐藏 */
const pageRef = ref<InstanceType<typeof page>>()
const systemStore = useSystemStore()
function addData(formData: any) {
  const param = { ...formData, ...checkedTreeData.value }
  systemStore.addNewPageDataAction(pageConfig.pageName, param).then(() => {
    ElMessage.success(`新增${pageConfig.pageDesc}信息成功`)
    pageRef.value?.fetchPageListData(true)
  })
}
function editData(id: number, formData: any) {
  const param = { ...formData, ...checkedTreeData.value }
  systemStore.editPageDataAction(pageConfig.pageName, id, param).then(() => {
    ElMessage.success(`编辑${pageConfig.pageDesc}信息成功`)
    pageRef.value?.fetchPageListData()
  })
}

function modalHidden() {
  treeRef.value?.setCheckedKeys([])
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
