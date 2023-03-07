<!--
 * @Description: 封装前的写法
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 11:32:31
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-07 14:11:33
-->
<template>
  <div class="user">
    <!-- 搜索条件 -->
    <div class="search">
      <!-- 1.输入搜索关键字的表单 -->
      <el-form
        :model="searchForm"
        ref="formRef"
        label-width="80px"
        size="large"
      >
        <el-row :gutter="20" justify="start">
          <el-col :span="6">
            <el-form-item label="用户名" prop="name">
              <el-input
                v-model="searchForm.name"
                placeholder="请输入查询的用户名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="真实姓名" prop="realname">
              <el-input
                v-model="searchForm.realname"
                placeholder="请输入查询的真实姓名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码" prop="cellphone">
              <el-input
                v-model="searchForm.cellphone"
                placeholder="请输入查询的手机号码"
              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="状态" prop="enable">
              <el-select
                v-model="searchForm.enable"
                placeholder="请选择查询的状态"
                style="width: 100%"
              >
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间" prop="createAt">
              <el-date-picker
                v-model="searchForm.createAt"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 2.重置和搜索的按钮 -->
      <div class="btns">
        <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
        <el-button icon="Search" type="primary" @click="handleQueryClick"
          >查询</el-button
        >
      </div>
    </div>
    <!-- 表格头部 -->
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />

        <el-table-column
          align="center"
          label="用户名"
          prop="name"
          width="150px"
        />
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="150px"
        />
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="150px"
        />
        <el-table-column
          align="center"
          label="状态"
          prop="enable"
          width="100px"
        >
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 页码 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="page.currentPage"
        v-model:page-size="page.pageSize"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 弹框 -->
    <user-modal
      ref="modalRef"
      @edit-data="handleEditData"
      @add-data="handleAddData"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
import UserModal from './c-cpns/user-modal.vue'
import useSystemStore from '@/stores/main/system/system'
import { formatUTC } from '@/utils/format-date'

// 查询数据的入参
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})
const page = reactive({
  currentPage: 1,
  pageSize: 10
})
// 第一次进页面发送请求
const systemStore = useSystemStore()
fetchUserListData()

// table数据
const { userList, usersTotalCount } = storeToRefs(systemStore)
/** 搜索框的操作 */
// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  resetPagination()
  fetchUserListData()
}
// 搜索
function handleQueryClick() {
  resetPagination()
  fetchUserListData()
}
function resetPagination() {
  page.currentPage = 1
  page.pageSize = 10
}
/** table里的编辑和删除 */
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewUserClick() {
  modalRef.value?.show(true)
}
function handleEditBtnClick(data: any) {
  modalRef.value?.show(false, data)
}
function handleDeleteBtnClick(id: number) {
  ElMessageBox.confirm('确定删除这个用户吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    systemStore.deleteUserByIdAction(id).then(() => {
      ElMessage.success('删除用户信息成功')
      fetchUserListData()
    })
  })
}
/** 页码的操作 */
function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}
/** 请求数据 */
function fetchUserListData() {
  const pageInfo = {
    size: page.pageSize,
    offset: (page.currentPage - 1) * page.pageSize
  }
  const params = { ...searchForm, ...pageInfo }
  systemStore.getUserListAction(params)
}
/** 弹框的回调 */
function handleEditData(id: number, formData: any) {
  systemStore.editUserDataAction(id, formData).then(() => {
    ElMessage.success('修改用户信息成功')
    fetchUserListData()
  })
}

function handleAddData(formData: any) {
  systemStore.addNewUserDataAction(formData).then(() => {
    ElMessage.success('新增用户成功')
    fetchUserListData()
  })
}
</script>

<style lang="less" scoped>
.user {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  overflow: hidden;
  .search {
    margin-bottom: 10px;
    .btns {
      text-align: right;
      padding: 0 0px 10px 0;

      .el-button {
        height: 36px;
      }
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
    }
  }
  .table {
    :deep(.el-table__cell) {
      padding: 12px 0;
    }

    .el-button {
      margin-left: 0;
      padding: 5px 8px;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
