type FormDataType = { [x: string]: any }

const useSearchStore = defineStore("searchStore", () => {
  const formData = ref<FormDataType>({})

  const setFormData = (value: FormDataType) => {
    formData.value = value
  }

  return {
    formData,
    setFormData,
  }
})

export default useSearchStore
