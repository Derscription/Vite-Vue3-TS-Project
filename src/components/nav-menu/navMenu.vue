<script setup lang="ts">
import { useLoginStore } from "@/stores"
import { _recursePathMapToMenu } from "@/utils/useMenus"
import type { userMenusType } from "./navMenuType"

defineProps<{
  collapse: boolean
}>()
const loginStore = useLoginStore()
const router = useRouter()
const route = useRoute()

const { userMenus } = storeToRefs(loginStore)
const menu = _recursePathMapToMenu(userMenus.value!, route.path)
const defaultActive = ref(menu?.id + "")

const handleMenuItemClick = (item: userMenusType) => {
  router.push({
    path: item.url ?? "/not-found",
  })
}
</script>

<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/superPaperMario.png" alt="logo" />
      <template v-if="!collapse">
        <span class="title">Vue3+Ts</span>
      </template>
    </div>

    <ElMenu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :unique-opened="true"
      :collapse="collapse"
    >
      <template v-for="item of userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <ElSubMenu :index="item.id + ''">
            <!-- 二级菜单可以展开的标题 -->
            <template #title>
              <template v-if="item.icon">
                <ElIcon>
                  <template v-if="item.icon === 'el-icon-monitor'">
                    <monitor />
                  </template>
                  <template v-if="item.icon === 'el-icon-setting'">
                    <setting />
                  </template>
                  <template v-if="item.icon === 'el-icon-goods'">
                    <goods />
                  </template>
                  <template v-if="item.icon === 'el-icon-chat-line-round'">
                    <chat-line-round />
                  </template>
                </ElIcon>
              </template>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subItem of item.children" :key="subItem.id">
              <ElMenuItem :index="subItem.id + ''" @click="handleMenuItemClick(subItem)">
                <span>{{ subItem.name }}</span>
              </ElMenuItem>
            </template>
          </ElSubMenu>
        </template>

        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <ElMenuItem :index="item.id + ''">
            <span>{{ item.name }}</span>
          </ElMenuItem>
        </template>
      </template>
    </ElMenu>
  </div>
</template>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: bold;
      color: white;
      line-height: 100% !important;
    }
  }

  // 目录
  .el-menu {
    border: none;
    border-right: none;

    .el-sub-menu {
      background-color: #001529 !important;
      // 二级菜单 ( 默认背景 )
      .el-menu-item {
        padding-left: 50px !important;
        background-color: #0c2135 !important;
      }

      .el-sub-menu__title {
        padding-left: 20px;
        color: rgb(183, 189, 195) !important;
        background-color: rgb(12, 33, 53) !important;
      }

      // hover 高亮
      .el-menu-item:hover {
        color: #fff !important; // 菜单
      }

      // 点击时的背景颜色
      .el-menu-item.is-active {
        color: #fff !important;
        background-color: #0a60bd !important;
      }
    }
  }
}
</style>
