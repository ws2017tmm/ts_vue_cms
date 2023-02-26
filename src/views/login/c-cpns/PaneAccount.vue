<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-24 17:01:40
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-26 19:13:04
-->
<template>
  <div class="account">
    <el-form
      :model="account"
      label-width="60px"
      size="large"
      status-icon
      :rules="rules"
      ref="formRef"
    >
      <!-- <el-form-item
        v-for="(item, index) in formList"
        :label="item.label"
        :prop="item.prop"
        :key="index"
      >
        <el-input v-model="account[formList[index][item.prop]]" />
      </el-form-item> -->
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { IAccount } from '@/types/login'
import useLoginStore from '@/stores/login/login'
import validator from '@/utils/validator'
import type { ElForm } from 'element-plus'

// const formList: [
//   { prop: 'name'; label: string },
//   { prop: 'password'; label: string }
// ] = [
//   { prop: 'name', label: '帐号' },
//   { prop: 'password', label: '密码' }
// ]
const account = reactive<IAccount>({
  name: '',
  password: ''
})
// 表单规则
const rules = reactive({
  name: [
    { required: true, message: 'Please input username', trigger: 'blur' },
    {
      validator: validator.requiredNoWhiteSpace(),
      trigger: 'blur'
    },
    { validator: validator.username(), trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    {
      validator: validator.requiredNoWhiteSpace(),
      trigger: 'blur'
    },
    { validator: validator.password(), trigger: 'blur' }
  ]
})
// 登录
// store
const loginStore = useLoginStore()
// 表单实例
const formRef = ref<InstanceType<typeof ElForm>>()
const loginAction = () => {
  // 检验
  formRef.value?.validate((valid) => {
    if (valid) {
      // 发送登录请求
      const param = {
        name: account.name,
        password: account.password
      }
      loginStore.loginAccountAction(param)
    } else {
      ElMessage.error('请您输入正确的帐号或密码~~')
      return false
    }
  })
}
// 父组件调子组件调方法，子组件调方法要导出才可以
defineExpose({
  loginAction
})
</script>

<style scoped>
.account {
  color: #000;
}
</style>
