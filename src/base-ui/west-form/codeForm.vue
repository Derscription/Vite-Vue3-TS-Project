<script setup lang="ts">
import type { IWestFormItemType, ICodeFormModelValue } from "./types/codeFormType"

const props = withDefaults(
  defineProps<{
    modelValue: ICodeFormModelValue
    formItems: IWestFormItemType[]
    labelWidth?: string
    itemStyle?: object
    colLayout?: object
  }>(),
  {
    formItems: () => [],
    colLayout: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24,
    }),
    itemStyle: () => ({ padding: "10px 40px" }),
    labelWidth: "100px",
  },
)
const emits = defineEmits<{
  (e: "update:modelValue", value: any): void
}>()

const handleValueChange = (value: any, filed: string) => {
  emits("update:modelValue", { ...props.modelValue, [filed]: value })
}
</script>

<template>
  <div class="code-form">
    <!-- 头部 -->
    <div class="header">
      <slot name="header"></slot>
    </div>

    <!-- 表单部分 -->
    <ElForm :label-width="labelWidth">
      <ElRow>
        <template v-for="item of formItems" :key="item.label">
          <ElCol v-bind="colLayout">
            <ElFormItem
              v-if="!item.isHidden"
              :label="item.label"
              :style="itemStyle"
              :rules="item.rules"
            >
              <!-- input和password输入框 -->
              <template v-if="item.type === 'input' || item.type === 'password'">
                <ElInput
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                />
              </template>

              <!-- select下拉框 -->
              <template v-else-if="item.type === 'select'">
                <ElSelect
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                >
                  <ElOption
                    v-for="option of item.options"
                    :key="option.title"
                    :value="option.value"
                    :label="option.title"
                  >
                  </ElOption>
                </ElSelect>
              </template>

              <!-- datepicker选择时间 -->
              <template v-else-if="item.type === 'datepicker'">
                <ElDatePicker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                >
                </ElDatePicker>
              </template>
            </ElFormItem>
          </ElCol>
        </template>
      </ElRow>
    </ElForm>

    <!-- 尾部 -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.code-form {
  padding: 1px 0;
}
</style>
