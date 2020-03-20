import Vue from 'vue'

function warning (msg: any) {
  Vue.prototype.$Message.warning({
    content: msg,
    duration: 20,
    closable: true
  })
}

function info (msg: any) {
  Vue.prototype.$Message.info({
    content: msg,
    duration: 20,
    closable: true
  })
}

function error (msg: any) {
  Vue.prototype.$Message.error({
    content: msg,
    duration: 20,
    closable: true
  })
}

function success (msg: any) {
  Vue.prototype.$Message.success({
    content: msg,
    duration: 20,
    closable: true
  })
}

function nWarning (title: any, desc: any) {
  Vue.prototype.$Notice.warning({
    duration: 20,
    title: title,
    desc: desc
  })
}

function nInfo (title: any, desc: any) {
  Vue.prototype.$Notice.info({
    duration: 20,
    title: title,
    desc: desc
  })
}

function nError (title: any, desc: any) {
  Vue.prototype.$Notice.error({
    duration: 20,
    title: title,
    desc: desc
  })
}

function nSuccess (title: any, desc: any) {
  Vue.prototype.$Notice.success({
    duration: 20,
    title: title,
    desc: desc
  })
}

function mError (title: any, content: any) {
  Vue.prototype.$Modal.error({
    title: title,
    content: content
  })
}

function mWarning (title: any, content: any) {
  Vue.prototype.$Modal.warning({
    title: title,
    content: content
  })
}

function mSuccess (title: any, content: any) {
  Vue.prototype.$Modal.success({
    title: title,
    content: content
  })
}

const msgutil = {
  warning: warning,
  info: info,
  error: error,
  success: success,
  nWarning: nWarning,
  nInfo: nInfo,
  nError: nError,
  nSuccess: nSuccess,
  mWarning: mWarning,
  mError: mError,
  mSuccess: mSuccess
}

export default msgutil
