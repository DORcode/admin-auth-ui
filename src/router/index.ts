import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import User from '../views/User.vue'
import Role from '../views/Role.vue'
import Permission from '../views/Permission.vue'
import sessionStore from '@/util/sessionstore'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: '登录页面',
    isNeedLogin: false,
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/sys/manage',
    name: '系统管理',
    component: Home,
    children: [
      {
        path: 'system',
        name: '应用',
        component: () => import('../views/app/System.vue')
      },
      {
        path: 'user',
        name: '用户',
        component: User
      },
      {
        path: 'role',
        name: '角色',
        component: Role
      },
      {
        path: 'permission',
        name: '权限',
        component: Permission
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

router.beforeEach((to, from, next) => {
  console.log(isNeedLogin(to))
  // 获取目标页面是否需要登录
  if (isNeedLogin(to)) {
    const expire = Number(sessionStore.get('tokenExpireTime'))
    console.log(new Date().getTime())
    // 当前token是否过期
    if (expire < new Date().getTime()) {
      router.push({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
