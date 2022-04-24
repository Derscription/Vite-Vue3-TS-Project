class LocalCache {
  public setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  public getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  public deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  public clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
