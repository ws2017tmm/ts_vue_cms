<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-02 11:18:34
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-05 18:52:53
-->
<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
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
          <el-form-item
            v-for="item in modalConfig.formItems"
            :label="item.label"
            :prop="item.prop"
            :key="item.prop"
          >
            <template v-if="item.type === FORM_ITEM_TYPE.INPUT">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-if="item.type === FORM_ITEM_TYPE.SELECT">
              <el-select
                v-model="formData[item.prop]"
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
                v-model="formData[item.prop]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </template>
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
import { reactive, ref, computed } from 'vue'
import type { ElForm } from 'element-plus'
import { FORM_ITEM_TYPE } from '@/global/constants'

// 定义内部的属性
const dialogVisible = ref(false)
// 定义props
/** 搜索条件的prop */
interface IFormType {
  type: string
  prop: string
  label: string
  placeholder?: string
  initialValue?: string
  options?: any[]
}
interface IModalProps {
  modalConfig: {
    modalName: string
    header: {
      addTitle: string
      editTitle: string
    }
    formItems: IFormType[]
  }
  otherInfo?: any
}
const modalProps = defineProps<IModalProps>()

const initialForm: any = {}
if (modalProps.modalConfig.formItems) {
  for (const item of modalProps.modalConfig.formItems) {
    initialForm[item.prop] = item.initialValue ?? ''
  }
}
// 数据的入参
const formData = reactive(initialForm)

const isAddRef = ref(true)
const editData = ref()
/** 标题 */
const title = computed(() => {
  return isAddRef.value
    ? modalProps.modalConfig.header.addTitle
    : modalProps.modalConfig.header.editTitle
})

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
