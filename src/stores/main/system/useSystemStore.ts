import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData,
} from "@/service/main/system/systemService"
import type {
  IPageUserListDataType,
  ISystemPageListActionType,
  ISystemDataType,
  SaveStateType,
  IPageRoleListDataType,
  ObtainStateType,
  IPageGoodsListDataType,
  IPageMenuListDataType,
  DeleteDataAction,
  ICreatePageData,
  IEditPageData,
  createWithEditResultType,
  IPageDepartmentListDataType,
  IPageCategoryListDataType,
  IStoryListType,
} from "@/stores/types"

const useSystemStore = defineStore("systemStore", () => {
  // * State
  const userList = ref<IPageUserListDataType[]>()
  const userCount = ref(0)
  const roleList = ref<IPageRoleListDataType[]>()
  const roleCount = ref(0)
  const goodsList = ref<IPageGoodsListDataType[]>()
  const goodsCount = ref(0)
  const menuList = ref<IPageMenuListDataType[]>()
  const menuCount = ref(0)
  const departmentList = ref<IPageDepartmentListDataType[]>()
  const departmentCount = ref(0)
  const categoryList = ref<IPageCategoryListDataType[]>()
  const categoryCount = ref(0)
  const storyList = ref<IStoryListType[]>()
  const storyCount = ref(0)

  // * Getters
  // 创建map映射，用来获取State中的数据
  const obtainState: ObtainStateType = {
    users: () => ({
      list: userList.value ?? [],
      count: userCount.value,
    }),
    role: () => ({
      list: roleList.value ?? [],
      count: roleCount.value,
    }),
    goods: () => ({
      list: goodsList.value ?? [],
      count: goodsCount.value,
    }),
    menu: () => ({
      list: menuList.value ?? [],
      count: menuCount.value,
    }),
    department: () => ({
      list: departmentList.value ?? [],
      count: departmentCount.value,
    }),
    category: () => ({
      list: categoryList.value ?? [],
      count: categoryCount.value,
    }),
    story: () => ({
      list: storyList.value ?? [],
      count: storyCount.value,
    }),
  }
  const pageListData = (pageName: string) => obtainState[pageName]()

  // * Actions
  // 创建map映射，用来判断请求回来的数据，存储在哪个state中
  const saveState: SaveStateType = {
    users: (list: any, count: number) => {
      userList.value = list
      userCount.value = count
    },
    role: (list: any, count: number) => {
      roleList.value = list
      roleCount.value = count
    },
    goods: (list: any, count: number) => {
      goodsList.value = list
      goodsCount.value = count
    },
    menu: (list: any, count?: number) => {
      menuList.value = list
      if (count) {
        menuCount.value = count
      }
    },
    department: (list: any, count: number) => {
      departmentList.value = list
      departmentCount.value = count
    },
    category: (list: any, count: number) => {
      categoryList.value = list
      categoryCount.value = count
    },
    story: (list: any, count: number) => {
      storyList.value = list
      storyCount.value = count
    },
  }

  const getPageListAction = async (payload: ISystemPageListActionType) => {
    // 1.获取pageUrl
    const pageName = payload.pageName
    const pageUrl = `/${pageName}/list`

    const pageResult = await getPageListData<ISystemDataType>(pageUrl, payload.queryInfo)
    const { list, totalCount } = pageResult.data
    saveState[pageName](list, totalCount)
  }

  const deletePageDataAction = async (payload: DeleteDataAction) => {
    try {
      // 1.获取pageName和id
      // pageName -> /users
      // id -> /users/id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 2.调用删除的网络请求
      await deletePageData(pageUrl)

      // 3.告诉用户删除成功
      ElMessage({
        type: "success",
        message: "删除成功!",
        duration: 1000,
        showClose: true,
      })

      // 3.重新请求最新的数据
      getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      })
    } catch (error) {
      ElMessage({
        type: "error",
        message: "删除失败! 请检查当前网络",
        duration: 1500,
        showClose: true,
      })
    }
  }

  const createPageDataAction = async (payload: ICreatePageData) => {
    try {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`

      // 2.发送创建请求
      const result = await createPageData<createWithEditResultType>(pageUrl, newData)

      // 3.请求最新的数据
      getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      })

      ElMessage({
        type: "success",
        message: result.data,
        duration: 1000,
        showClose: true,
      })
    } catch (error) {
      ElMessage({
        type: "error",
        message: "创建失败",
        duration: 1000,
        showClose: true,
      })
    }
  }

  const editPageDataAction = async (payload: IEditPageData) => {
    try {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 2.发送编辑请求
      const loginResult = await editPageData<createWithEditResultType>(pageUrl, editData)

      // 3.请求最新的数据
      getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      })

      ElMessage({
        type: "success",
        message: loginResult.data,
        duration: 1000,
        showClose: true,
      })
    } catch (error) {
      ElMessage({
        type: "error",
        message: "编辑失败",
        duration: 1000,
        showClose: true,
      })
    }
  }

  return {
    // * State
    userList,
    userCount,
    roleList,
    roleCount,
    goodsList,
    goodsCount,
    menuList,
    menuCount,
    departmentList,
    departmentCount,
    categoryList,
    categoryCount,
    storyList,
    storyCount,

    // * Getters
    pageListData,

    // * Actions
    getPageListAction,
    deletePageDataAction,
    createPageDataAction,
    editPageDataAction,
  }
})

export default useSystemStore
