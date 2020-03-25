import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import './theme/index.less'
import msg from './util/message'
import api from './api/api'

Vue.config.productionTip = false

Vue.prototype.$msg = msg // 其他页面在使用 URLS 的时候直接  this.$msg 就可以了
Vue.prototype.$api = api

Vue.use(ViewUI, {
  transfer: true,
  size: 'large',
  capture: false,
  select: {
    arrow: 'md-arrow-dropdown',
    arrowSize: 20
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
