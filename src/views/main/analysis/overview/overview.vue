<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 11:30:13
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-08 12:30:25
-->
<template>
  <div class="overview">
    overview<el-button type="primary" v-debounce="[reset]">tset</el-button>
  </div>
</template>

<script setup lang="ts">
function reset() {
  console.log('----reset')
}
</script>

<style scoped>
.overview {
  color: #000;
}
</style>
