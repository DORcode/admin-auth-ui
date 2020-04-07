import axios from 'axios'
import sessionStore from '../util/sessionstore'
import msg from '../util/message'
import router from '@/router'
import qs from 'qs'

const TIMEOUT = 600000
const instance = axios.create()

instance.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    console.log(sessionStore.get('token'))
    if (sessionStore.get('token')) {
      config.headers.token = sessionStore.get('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
instance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.success) {
      msg.info(res.msg)
    } else {
      if (res.code === 2040) {
        router.push('/login')
      }
      msg.error(res.msg)
    }
    return res
  },
  error => {
    if (error.response.status === 500) {
      msg.error('服务端异常')
    } else {
      msg.error('请求异常')
    }
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

const post = (url: string, data?: any) => {
  if (!data) {
    data = {}
  }

  return instance({
    method: 'post',
    url: url,
    data: JSON.stringify(data),
    timeout: TIMEOUT,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, token'
    }
  }).then(
    (response) => {
      return response
    }
  ).catch(
    (error) => {
      console.log(error.response)
      if (error.response && error.response.data && error.response.data.msg) {
        msg.error(error.response.data.msg)
      }
    }
  )
}

const postForm = (url: string, data: any) => {
  return axios({
    method: 'post',
    url,
    data: qs.stringify(data),
    timeout: TIMEOUT,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  }).then(
    (response) => {
      return response
    }
  ).catch(
    (error) => {
      console.log(error.response.data)
      if (error.response && error.response.data && error.response.data.msg) {
        msg.error(error.response.data.msg)
      }
    }
  )
}

const postProgress = (url: string, data: any, config: any) => {
  return axios.post(url, data, config).then(
    (response) => {
      return response
    }
  ).catch(
    (error) => {
      if (error.response && error.response.data && error.response.data.msg) {
        msg.error(error.response.data.msg)
      }
    }
  )
}

const get = (url: string, params?: any) => {
  return axios({
    method: 'get',
    url,
    params,
    timeout: TIMEOUT,
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  }).then(
    (response) => {
      return response
    }
  ).catch(
    (error) => {
      console.log(error.response.data)
      if (error.response && error.response.data && error.response.data.msg) {
        msg.error(error.response.data.msg)
      }
    }
  )
}

const del = (url: string) => {
  return axios({
    method: 'delete',
    url,
    timeout: TIMEOUT,
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  }).then(
    (response) => {
      return response
    }
  ).catch(
    (error) => {
      if (error.response && error.response.data && error.response.data.msg) {
        msg.error(error.response.data.msg)
      }
    }
  )
}

const Login = {
  login (data: any) {
    return post('/api/auth/login', data)
  },

  logout () {
    return get('/api/auth/logout')
  }
}

// 用户管理
const User = {
  selectSysUsers (data: any) {
    return post('/api/sysuser/selectSysUsers', data)
  },

  deleteSysUserById (data: any) {
    return post('/api/sysuser/deleteSysUserById', data)
  },

  deleteSysUsers (data: any) {
    return post('/api/sysuser/deleteSysUsers', data)
  },

  updateSysUser (data: any) {
    return post('/api/sysuser/updateSysUser', data)
  },

  insertSysUser (data: any) {
    return post('/api/sysuser/insertSysUser', data)
  },

  insertSysUsers (data: any) {
    return post('/api/sysuser/insertSysUsers', data)
  }

}

// 角色管理
const Role = {
  selectSysRoles (data: any) {
    return post('/api/sysrole/selectSysRoles', data)
  },

  deleteSysRoleById (data: any) {
    return post('/api/sysrole/deleteSysRoleById', data)
  },

  deleteSysRoles (data: any) {
    return post('/api/sysrole/deleteSysRoles', data)
  },

  updateSysRole (data: any) {
    return post('/api/sysrole/updateSysRole', data)
  },

  insertSysRole (data: any) {
    return post('/api/sysrole/insertSysRole', data)
  },

  insertSysRoles (data: any) {
    return post('/api/sysrole/insertSysRoles', data)
  }
}

const RoleUser = {
  selectSysUserRoles (data: any) {
    return post('/api/sysuserrole/selectSysUserRoles', data)
  },

  selectRelatedSysUsers (data: any) {
    return post('/api/sysuserrole/selectRelatedSysUsers', data)
  },

  selectUnrelatedSysUsers (data: any) {
    return post('/api/sysuserrole/selectUnrelatedSysUsers', data)
  },

  deleteSysUserRoleById (data: any) {
    return post('/api/sysuserrole/deleteSysUserRoleById', data)
  },

  deleteSysUserRoles (data: any) {
    return post('/api/sysuserrole/deleteSysUserRoles', data)
  },

  insertSysUserRoles (data: any) {
    return post('/api/sysuserrole/insertSysUserRoles', data)
  }
}

const Permission = {
  menus () {
    return post('/api/syspermission/menus')
  },

  selectPermissionList () {
    return post('/api/syspermission/selectPermissionList')
  },

  insertSysPermission (data: any) {
    return post('/api/syspermission/insertSysPermission', data)
  },

  updateSysPermission (data: any) {
    return post('/api/syspermission/updateSysPermission', data)
  },

  deleteSysPermission (data: any) {
    return post('/api/syspermission/deleteSysPermission', data)
  },

  deleteSysPermissions (data: any) {
    return post('/api/syspermission/deleteSysPermissions', data)
  }
}

const RolePermission = {
  selectSysRolePermissions (roleId: string) {
    return get(`/api/syspermission/selectSysRolePermissions/${roleId}`)
  },

  insertSysRolePermissions (data: any) {
    return post('/api/syspermission/insertSysRolePermissions', data)
  },

  deleteSysRolePermission (roleId: string) {
    return get(`/api/syspermission/deleteSysRolePermission/${roleId}`)
  }
}

const APIS = {
  ...Login,
  ...User,
  ...Role,
  ...RoleUser,
  ...Permission,
  ...RolePermission,
}

export default APIS
