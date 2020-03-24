import axios from 'axios'
import sessionstore from '../util/sessionstore'
import msg from '@/util/message'
import qs from 'qs'

const TIMEOUT = 600000
const instance = axios.create()

// 使用 axios 发送表单数据 ('content-type': 'application/x-www-form-urlencoded')

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
    // 根据编号或其它状态来判断问题，并提醒
    return res
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

const checkStatus = (response: any) => {
  // console.log(JSON.stringify(response))
  if (response.status === 200 || response.status === 304) {
    if (response.data && response.data.success) {
      return response
    }
  }
  return {
    data: {
      error: {
        code: response.data.error.code,
        msg: response.data.error.msg,
        status: response.status
      }
    }
  }
}
const checkCode = (res: any) => {
  // console.log('checkCode.res=' + JSON.stringify(res.data.message))
  if (res.status !== 200) {
    if ((res.data) && (res.data.error)) {
      console.log('res.error = ' + JSON.stringify(res.data.error))
    }
    // console.log(res.data.message)
  }
  return res
}

const post = (url: string, data?: any) => {
//   const token = sessionstore.get('token')
//   let header = {}
//   if(sessionstore.get('token')) {
//     header = {'token': sessionstore.get('token')}
//   }
  if (!data) {
    data = {}
  }

  return axios({
    method: 'post',
    url: url,
    data: data,
    timeout: TIMEOUT
  }).then(
    (response) => {
      return response
    }
  ).catch(
    (error) => {
      console.log(error.response.data)
      msg.error(error.response.data.msg)
    }
  )
}

const postForm = (url: string, data: any) => {
  return axios({
    method: 'get',
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
      msg.error(error.response.data.msg)
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
      msg.error(error.response.data.msg)
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
      msg.error(error.response.data.msg)
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
      return checkStatus(response)
    }
  ).catch(
    (error) => {
      msg.error(error.response.data.msg)
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

const Permission = {
  menus () {
    return post('/api/syspermission/menus')
  }

}

const APIS = {
  ...Login,
  ...Permission
}

export default APIS
