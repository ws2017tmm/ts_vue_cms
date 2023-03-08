<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 11:30:13
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-08 16:33:40
-->
<template>
  <div class="overview">
    overview
    <el-button type="primary" v-debounce="[reset]"> tset </el-button>
    <el-button type="primary" @click="changeLang('en')">
      {{ $t('login.userName') }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
function reset() {
  console.log('----reset')
}

const changeLang = (lang: string) => {
  locale.value = lang
  localCache.setCache('lang', lang)
}
</script>

<style scoped>
.overview {
  color: #000;
}
</style>
