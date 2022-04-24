<script setup lang="ts">
import phoneConfig from "@/views/login/config/phone-config"

const phone = reactive({
  num: "",
  verifyCode: "",
})

const getVerificationCode = () => {
  ElMessage({
    message: "暂时无法获取验证码~",
    type: "warning",
    showClose: true,
    duration: 1550,
  })
}

const loginAction = () => {
  ElMessage({
    message: "手机号登录功能暂未开放~",
    type: "warning",
    showClose: true,
    duration: 1550,
  })
}

defineExpose({
  loginAction,
})
</script>

<template>
  <div class="loginPhone">
    <ElForm label-width="300" :rules="phoneConfig" :model="phone">
      <ElFormItem label="手机号" prop="num">
        <ElInput v-model="phone.num"></ElInput>
      </ElFormItem>
      <ElFormItem label="验证码" prop="verifyCode">
        <div class="get-code">
          <ElInput v-model="phone.verifyCode" class="get-btn"></ElInput>
          <ElButton @click="getVerificationCode" type="primary"> 获取验证码 </ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped lang="less">
.get-code {
  display: flex;

  .get-btn {
    padding-right: 8px;
  }
}
</style>
