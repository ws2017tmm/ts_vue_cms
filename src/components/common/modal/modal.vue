<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-02 11:18:34
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-03 09:12:32
-->
<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isAddRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
      @close="handleCancelclick"
    >
      <div class="form">
        <el-form
          :model="formData"
          label-width="80px"
          size="large"
          ref="formRef"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="formData.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <el-form-item v-if="isAddRef" label="密码" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="formData.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select
              v-model="formData.roleId"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select
              v-model="formData.departmentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancelclick">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import type { ElForm } from 'element-plus'

// 定义内部的属性
const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const isAddRef = ref(true)
const editData = ref()

// 获取roles/departments数据
const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

// 定义设置dialogVisible方法
function show(isAdd: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isAddRef.value = isAdd
  if (!isAdd && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  }
}

const formRef = ref<InstanceType<typeof ElForm>>()
function hidden() {
  formRef.value?.resetFields()
  dialogVisible.value = false
}

const emit = defineEmits(['editData', 'addData'])
// 点击了确定的逻辑
function handleConfirmClick() {
  if (!isAddRef.value && editData.value) {
    // 编辑用户的数据
    emit('editData', editData.value.id, formData)
  } else {
    // 创建新的用户
    emit('addData', formData)
  }
  hidden()
}
// 取消
function handleCancelclick() {
  hidden()
}

// 暴露的属性和方法
defineExpose({ show })
</script>

<style lang="less" scoped>
.user-modal {
  color: #000;
}
</style>
