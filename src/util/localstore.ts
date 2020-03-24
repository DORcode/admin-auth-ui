const localStore = {
  get: (name: string) => window.localStorage.getItem(name),
  set: (name: string, data: any) => window.localStorage.setItem(name, data),
  remove: (name: string) => window.localStorage.removeItem(name),
  clear: () => window.localStorage.clear()
}

export default localStore
