<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 11:32:24
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-03 17:19:38
-->
<template>
  <div class="role">
    <page :page-config="pageConfig">
      <template #intro="scope">
        <span class="intro">测试-{{ scope.row[scope.prop] }}</span>
      </template>
    </page>
  </div>
</template>

<script setup lang="ts">
import page from '@/components/common/page/page.vue'
import pageConfig from './config/role.config'
</script>

<style lang="less" scoped>
.role {
  color: #000;
  .intro {
    color: red;
  }
}
</style>
