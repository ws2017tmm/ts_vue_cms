<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-23 20:26:41
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-24 11:40:41
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'

console.log(import.meta.env, '---import.meta')
</script>

<template>
  <div class="wrapper">App</div>
  <RouterView />
</template>

<style scoped></style>
