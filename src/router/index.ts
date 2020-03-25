import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import sessionStore from '../util/sessionstore'
import msg from '../util/message'
import localStore from '../util/localstore'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/login',
    name: '登录页面',
    icon: '',
    isNeedLogin: false, // 是否需要登录
    access: false, // 是否可以访问， true:可以访问, false: 不可以访问
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    icon: '',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    icon: '',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/sys/manage',
    name: '系统管理',
    icon: '',
    component: Home,
    children: [
      {
        path: 'system',
        name: '应用',
        icon: '',
        component: () => import('../views/app/System.vue')
      },
      {
        path: 'user',
        name: '用户',
        icon: '',
        component: () => import('../views/User.vue')
      },
      {
        path: 'role',
        name: '角色',
        icon: '',
        component: () => import('../views/Role.vue')
      },
      {
        path: 'permission',
        name: '权限',
        icon: '',
        component: () => import('../views/Permission.vue')
      },
      {
        path: 'table',
        name: '分页',
        isNeedLogin: false,
        component: () => import('../components/table/table-page.vue')
      }
    ]
  },
  {
    path: '/tags',
    name: '已打开',
    isNeedLogin: true,
    component: () => import(/* webpackChunkName: "tags" */ '../components/tags-nav/tags-nav.vue')
  },
  {
    path: '/table',
    name: '分页',
    isNeedLogin: false,
    component: () => import('../components/table/table-page.vue')
  },
  {
    path: '/401',
    name: '401',
    component: () => import(/* webpackChunkName: "401" */ '../views/error-page/401.vue')
  },
  {
    path: '/500',
    name: '500',
    component: () => import(/* webpackChunkName: "500" */ '../views/error-page/500.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/error-page/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

function isNeedLogin (item: any): boolean {
  let flag = false
  routes.forEach(
    (val) => {
      if (val.path === item.path) {
        flag = val.isNeedLogin ? val.isNeedLogin : false
      }
    }
  )
  return flag
}

function isAccess (item: any): boolean {
  // 和localStore中的tree比较，如果存在，则可以访问
  const menus = JSON.parse(localStorage.getItem('menus') || '[]')
  let flag = false
  menus.forEach(
    (val: any) => {
      if (val.path === item.path) {
        flag = true
      }
    }
  )

  return flag
}

router.beforeEach((to, from, next) => {
  // 获取目标页面是否需要登录
  if (isNeedLogin(to)) {
    const expire = Number(sessionStore.get('tokenExpireTime'))
    console.log(new Date().getTime())
    // 当前token是否过期
    if (expire < new Date().getTime()) {
      router.push({ path: '/login' })
    } else {
      // 有访问的权限
      if (isAccess(to)) {
        next()
      } else {
        next(false)
        msg.warning('无访问权限!')
      }
    }
  } else {
    next()
  }
})

export default router
