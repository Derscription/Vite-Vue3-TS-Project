declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $filters: {
      formatTime: (value: string) => void
    }
  }
}

export {}
