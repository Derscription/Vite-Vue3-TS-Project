<script setup lang="ts">
import { useLoginStore } from "@/stores"
import localCache from "@/utils/cache"

const loginStore = useLoginStore()
const router = useRouter()
const { userInfo } = storeToRefs(loginStore)
const name = computed(() => userInfo.value?.name)

const handleExitClick = () => {
  localCache.deleteCache("token")
  router.push("/login")
}
</script>

<template>
  <div class="userInfo">
    <el-dropdown>
      <span class="el-dropdown-link">
        <ElAvatar
          size="small"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></ElAvatar>
        <span class="title">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
          <el-dropdown-item divided @click="handleExitClick">
            <ElIcon class="user-info-icon"><circle-close /></ElIcon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="less">
.userInfo {
  cursor: pointer;

  .el-dropdown-link {
    display: flex;
    align-items: center;

    .title {
      margin-left: 5px;
    }
  }

  .user-info-icon {
    margin-right: 0 !important;
  }
}

::v-deep .el-dropdown-menu__item:last-child:hover {
  color: red;
}

::v-deep .el-dropdown-menu__item--divided {
  height: 0;
  list-style: none;
}
</style>
