<script setup lang="ts">
import LoginAccount from "./loginAccount.vue"
import LoginPhone from "./loginPhone.vue"

const isKeepPassword = ref(true)
const currentTab = ref("account")
const loginAccountRef = ref<InstanceType<typeof LoginAccount>>()
const loginPhoneRef = ref<InstanceType<typeof LoginPhone>>()

const handleLoginClick = () => {
  // 判断是账号登录还是手机号登录
  if (currentTab.value === "account") {
    loginAccountRef.value?.loginAction(isKeepPassword.value)
  } else {
    loginPhoneRef.value?.loginAction()
  }
}
</script>

<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!-- 用户登录选项 -->
    <ElTabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <ElTabPane name="account">
        <!-- 标签栏 -->
        <template #label>
          <span>
            <ElIcon><user-filled /></ElIcon>
            账号登录
          </span>
        </template>
        <!-- 内容 -->
        <LoginAccount ref="loginAccountRef"></LoginAccount>
      </ElTabPane>
      <ElTabPane name="phone">
        <!-- 标签栏 -->
        <template #label>
          <span>
            <ElIcon><iphone /></ElIcon>
            手机登录
          </span>
        </template>
        <!-- 内容 -->
        <LoginPhone ref="loginPhoneRef"></LoginPhone>
      </ElTabPane>
    </ElTabs>

    <!-- 登录的辅助功能 -->
    <template v-if="currentTab === 'account'">
      <div class="account-control">
        <ElCheckbox v-model="isKeepPassword">记住密码</ElCheckbox>
        <ElLink type="primary">忘记密码</ElLink>
      </div>
    </template>

    <!-- 登录按钮 -->
    <ElButton type="primary" class="login-button" @click="handleLoginClick"> 立即登录 </ElButton>
  </div>
</template>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .login-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
