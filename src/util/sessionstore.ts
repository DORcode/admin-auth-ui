const sessionStore = {
  get: (name: string) => window.sessionStorage.getItem(name),
  set: (name: string, data: any) => window.sessionStorage.setItem(name, data),
  remove: (name: string) => window.sessionStorage.removeItem(name),
  clear: () => window.sessionStorage.clear()
}

export default sessionStore