<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 11:32:31
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-07 09:58:01
-->
<template>
  <div class="page">
    <!-- 搜索条件 -->
    <div v-if="pageConfig.searchConfig" class="search">
      <!-- 1.输入搜索关键字的表单 -->
      <el-form
        :model="searchForm"
        ref="formRef"
        :label-width="pageConfig.searchConfig?.labelWidth ?? '80px'"
        size="large"
      >
        <el-row :gutter="20" justify="start">
          <el-col
            :span="6"
            v-for="item in pageConfig.searchConfig?.searchFormItems"
            :key="item.prop"
          >
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === FORM_ITEM_TYPE.INPUT">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === FORM_ITEM_TYPE.SELECT">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option
                    :label="option.label"
                    :value="option.value"
                    v-for="option in item.options"
                    :key="option.value"
                  />
                </el-select>
              </template>
              <template v-if="item.type === FORM_ITEM_TYPE.DATE_PICKER">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
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
    <div class="table-header">
      <h3 class="title">{{ pageConfig.tableConfig.header.title }}</h3>
      <el-button
        v-if="pageConfig.tableConfig.header.btnTitle"
        type="primary"
        @click="handleAddNewItemClick"
      >
        {{ pageConfig.tableConfig.header.btnTitle }}
      </el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="pageConfig.tableConfig.childrenTree"
      >
        <template
          v-for="item in pageConfig.tableConfig.tableList"
          :key="item.prop"
        >
          <template v-if="item.tc_type === TABLE_COLUMN_TYPE.TIMER">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.tc_type === TABLE_COLUMN_TYPE.CUSTOM">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <template
            v-else-if="
              item.tc_type === TABLE_COLUMN_TYPE.SELECTION ||
              item.tc_type === TABLE_COLUMN_TYPE.INDEX
            "
          >
            <el-table-column
              align="center"
              v-bind="item"
              :type="item.tc_type"
            />
          </template>
          <template v-else-if="item.tc_type === TABLE_COLUMN_TYPE.OPERATION">
            <el-table-column align="center" v-bind="item">
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
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <!-- 页码 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="page.currentPage"
        v-model:page-size="page.pageSize"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/main/system/system'
import { formatUTC } from '@/utils/format-date'
import { FORM_ITEM_TYPE, TABLE_COLUMN_TYPE } from '@/global/constants'

/** 搜索条件的prop */
interface ISearchType {
  type: string
  prop: string
  label: string
  placeholder?: string
  initialValue?: string
  options?: any[]
}
/** table的prop */
interface ITableType {
  tc_type: string
  prop: string
  label: string
  width?: string
  slotName?: string
}
interface IPageProps {
  pageConfig: {
    pageName: string
    pageDesc: string
    searchConfig?: {
      labelWidth?: string
      searchFormItems: ISearchType[]
    }
    tableConfig: {
      header: {
        title: string
        btnTitle?: string
      }
      tableList: ITableType[]
      childrenTree?: any
    }
  }
}
const pageProps = defineProps<IPageProps>()

// 定义form的数据
const initialForm: any = {}
if (pageProps.pageConfig.searchConfig) {
  for (const item of pageProps.pageConfig.searchConfig.searchFormItems) {
    initialForm[item.prop] = item.initialValue ?? ''
  }
}
// 查询数据的入参
const searchForm = reactive(initialForm)
const page = reactive({
  currentPage: 1,
  pageSize: 10
})

// 定义事件
const emit = defineEmits(['addNewClick', 'editClick'])

// 第一次进页面发送请求
const systemStore = useSystemStore()
fetchPageListData()

// table数据
const { pageList, pageTotalCount } = storeToRefs(systemStore)
/** 搜索框的操作 */
// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  resetPagination()
  fetchPageListData()
}
// 搜索
function handleQueryClick() {
  resetPagination()
  fetchPageListData()
}
function resetPagination() {
  page.currentPage = 1
  page.pageSize = 10
}
/** table里的编辑和删除 */
function handleAddNewItemClick() {
  emit('addNewClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

function handleDeleteBtnClick(id: number) {
  ElMessageBox.confirm(
    `确定删除这个${pageProps.pageConfig.pageDesc}吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    systemStore
      .deletePageByIdAction(pageProps.pageConfig.pageName, id)
      .then(() => {
        ElMessage.success(`删除${pageProps.pageConfig.pageDesc}信息成功`)
        fetchPageListData()
      })
  })
}
/** 页码的操作 */
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}
/** 请求数据 */
function fetchPageListData(isReset?: boolean) {
  if (isReset) {
    resetPagination()
    formRef.value?.resetFields()
  }
  const pageInfo = {
    size: page.pageSize,
    offset: (page.currentPage - 1) * page.pageSize
  }
  const params = { ...searchForm, ...pageInfo }
  systemStore.getPageListAction(pageProps.pageConfig.pageName, params)
}
// 导出方法，父组件可以调用
defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.page {
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
  .table-header {
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
