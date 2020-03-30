import axios from 'axios'
import sessionstore from '../util/sessionstore'
import msg from '../util/message'
import qs from 'qs'

const TIMEOUT = 600000
const instance = axios.create()

instance.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    if (sessionstore.get('token')) {
      config.headers.token = sessionstore.get('token')
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
    msg.info(res.msg)
    console.log(res)
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
    return post('/api/sysuser/deleteSysUsers', data)
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
    
}

const Permission = {
  menus () {
    return post('/api/syspermission/menus')
  }

}

const APIS = {
  ...Login,
  ...User,
  ...Role,
  ...Permission
}

export default APIS
