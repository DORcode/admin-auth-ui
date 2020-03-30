import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import './theme/index.less'
import msg from './util/message'
import api from './api/api'
import i18n from '@/locale'

Vue.config.productionTip = false

Vue.prototype.$msg = msg // 其他页面在使用 URLS 的时候直接  this.$msg 就可以了
Vue.prototype.$api = api

Vue.use(ViewUI, {
  i18n: (key: any, value: any) => i18n.t(key, value)
})

window['vm'] = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
