import pageContent from "@/components/page-content/pageContent.vue"

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()

  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return {
    pageContentRef,
    handleResetClick,
    handleQueryClick,
  }
}
