import Api from '../api/api'
import localStore from '../util/localstore'
import { routes } from '../router'

function getRouterItem (list: any, item: any): any {
  list.forEach(
    (val: any) => {
      if (val.path === item.path) {
        return val
      } else {
        if (val.children && val.children.length > 0) {
          return getRouterItem(val.children, item)
        }
      }
    }
  )
}

function getMenusWithRouter (menus: any) {
  menus.forEach(
    (item: any) => {
      const route: any = getRouterItem(routes, item)
      if (!item.icon) {
        item.icon = route.icon
      }
      if (item.subMenus && item.subMenus.length > 0) {
        getMenusWithRouter(item.subMenus)
      }
    }
  )
  return menus
}

export default function getMenus () {
  Api.menus().then(
    (res: any) => {
      if (res.data) {
        // 将menus中补充数据到
        const data = res.data
        localStore.set('menus', getMenusWithRouter(data))
        this.$router.push({ path: '/' })
        this.$Message.success(res.data.msg)
      } else {
        this.$Message.warning(res.data.msg)
      }
    }
  )
}
