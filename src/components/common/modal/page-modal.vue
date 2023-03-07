<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-02 11:18:34
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-07 13:57:33
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
            <template v-if="item.type === FORM_ITEM_TYPE.CUSTOM">
              <slot :name="item.slotName"></slot>
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
import { reactive, ref, computed, nextTick } from 'vue'
import type { ElForm } from 'element-plus'
import { FORM_ITEM_TYPE } from '@/global/constants'
import useSystemStore from '@/stores/main/system/system'

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
  slotName?: string
}
interface IModalProps {
  modalConfig: {
    modalName: string
    modalDesc: string
    header: {
      addTitle: string
      editTitle: string
    }
    formItems: IFormType[]
  }
  otherParam?: any
}
const modalProps = defineProps<IModalProps>()
// eslint-disable-next-line no-debugger
debugger
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
  nextTick(() => {
    if (!isAdd && itemData) {
      // 编辑数据
      for (const key in formData) {
        formData[key] = itemData[key]
      }
      editData.value = itemData
    }
  })
}

const formRef = ref<InstanceType<typeof ElForm>>()
function hidden() {
  formRef.value?.resetFields()
  emit('hidden')
  dialogVisible.value = false
}

const emit = defineEmits(['confirmSuccess', 'hidden'])
// 点击了确定的逻辑
const systemStore = useSystemStore()
function handleConfirmClick() {
  let param = {}
  if (modalProps.otherParam) {
    param = { ...formData, ...modalProps.otherParam }
  } else {
    param = { ...formData, ...modalProps.otherParam }
  }
  if (!isAddRef.value && editData.value) {
    // 编辑用户的数据
    systemStore
      .editPageDataAction(
        modalProps.modalConfig.modalName,
        editData.value.id,
        param
      )
      .then(() => {
        emit('confirmSuccess')
        hidden()
        ElMessage.success(`编辑${modalProps.modalConfig.modalDesc}信息成功`)
      })
  } else {
    // 新增用户的数据
    systemStore
      .addNewPageDataAction(modalProps.modalConfig.modalName, param)
      .then(() => {
        emit('confirmSuccess')
        hidden()
        ElMessage.success(`新增${modalProps.modalConfig.modalDesc}信息成功`)
      })
  }
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
