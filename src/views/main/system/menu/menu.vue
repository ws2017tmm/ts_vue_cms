<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 11:32:18
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-06 10:13:30
-->
<template>
  <div class="menu">
    <page :page-config="pageConfig" />
  </div>
</template>

<script setup lang="ts">
import Page from '@/components/common/page/page.vue'
import pageConfig from './config/menu.config'
</script>

<style scoped>
.menu {
  color: #000;
}
</style>
