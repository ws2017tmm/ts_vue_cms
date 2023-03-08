<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 11:30:13
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-08 16:21:22
-->
<template>
  <div class="overview">
    overview
    <el-button type="primary" v-debounce="[reset]"> tset </el-button>
    <el-button type="primary" @click="test">
      {{ $t('login.userName') }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { loadLocalMessage } from '@/locales/i18n'
function reset() {
  console.log('----reset')
}
function test() {
  loadLocalMessage()
}
</script>

<style scoped>
.overview {
  color: #000;
}
</style>
