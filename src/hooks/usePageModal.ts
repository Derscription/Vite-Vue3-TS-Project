import pageModal from "@/components/page-modal/pageModal.vue"
export function usePageModal(newCallback?: () => void, editCallback?: (item?: any) => void) {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const defaultInfo = ref({})

  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      newCallback && newCallback()
      pageModalRef.value.title = "创建"
      pageModalRef.value.centerDialogVisible = true
    }
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      editCallback && editCallback(item)
      pageModalRef.value.title = "编辑"
      pageModalRef.value.centerDialogVisible = true
    }
  }

  return {
    pageModalRef,
    defaultInfo,
    handleEditData,
    handleNewData,
  }
}
