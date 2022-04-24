<script setup lang="ts">
import accountConfig from "@/views/login/config/account-config"
import { ElForm } from "element-plus"
import localCache from "@/utils/cache"
import { useLoginStore } from "@/stores"

const account = reactive({
  name: localCache.getCache("name") ?? "",
  password: localCache.getCache("password") ?? "",
})
const elFormRef = ref<InstanceType<typeof ElForm>>()

const loginAction = (isKeepPassword: boolean) => {
  elFormRef.value?.validate((valid) => {
    const loginStore = useLoginStore()
    if (valid) {
      // 1.判断是否需要记住密码
      if (isKeepPassword) {
        // 本地缓存
        localCache.setCache("name", account.name)
        localCache.setCache("password", account.password)
      } else {
        localCache.deleteCache("name")
        localCache.deleteCache("password")
      }

      // 2.开始进行登录验证
      loginStore.accountLoginAction(account)
    }
  })
}

defineExpose({
  loginAction,
})
</script>

<template>
  <div class="loginAccount">
    <ElForm label-width="300" :rules="accountConfig" :model="account" ref="elFormRef">
      <ElFormItem label="账号" prop="name">
        <ElInput v-model="account.name"></ElInput>
      </ElFormItem>
      <ElFormItem label="密码" prop="password">
        <ElInput v-model="account.password" show-password></ElInput>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped lang="less"></style>
