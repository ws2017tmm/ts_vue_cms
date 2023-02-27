<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-26 22:02:14
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-27 11:10:34
-->
<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">面包屑</div>
      <personal-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PersonalInfo from './c-cpns/personal-info.vue'

// 记录状态---展开还是折叠
const isFold = ref(false)
// 定义事件
const emit = defineEmits(['foldChange'])
function handleMenuIconClick() {
  isFold.value = !isFold.value
  // 将事件和状态传递给父组件
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
