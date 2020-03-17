import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Role from '../views/Role.vue'
import Permission from '../views/Permission.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: '登录页面',
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
  base: process.env.BASE_URL,
  routes
})

export default router
