import { getPageListData } from "@/service/main/system/systemService"
import type {
  IDepartmentListType,
  IMenusListType,
  IRoleListType,
  ISystemDataType,
} from "@/stores/types"

const useSystemRequestStore = defineStore("systemReqeustStore", () => {
  const entireDepartment = ref<IDepartmentListType[]>([])
  const entireRole = ref<IRoleListType[]>([])
  const entireMenu = ref<IMenusListType[]>([])

  const getInitialDataAction = async () => {
    // 1.请求部门和角色数据
    const {
      data: { list: departmentList },
    } = await getPageListData<ISystemDataType>(
      "/department/list",
      {
        offset: 0,
        size: 1000,
      },
      false,
    )
    const {
      data: { list: roleList },
    } = await getPageListData(
      "/role/list",
      {
        offset: 0,
        size: 1000,
      },
      false,
    )
    const {
      data: { list: menuList },
    } = await getPageListData("/menu/list", {}, false)

    // 2.保存数据
    entireDepartment.value = departmentList
    entireRole.value = roleList
    entireMenu.value = menuList
  }

  return {
    entireDepartment,
    entireRole,
    entireMenu,

    getInitialDataAction,
  }
})

export default useSystemRequestStore
