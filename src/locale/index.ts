import Vue from 'vue'
import VueI18n from 'vue-i18n'
import localStore from '../util/localstore'
import zhCN from './lang/zh-CN'
import zhTW from './lang/zh-TW'
import en from './lang/en-US'
import zhCNView from 'view-design/dist/locale/zh-CN'
import zhTWView from 'view-design/dist/locale/zh-TW'
import enView from 'view-design/dist/locale/en-US'

Vue.use(VueI18n)

const zhCNs = {
  ...zhCN,
  ...zhCNView
}

const zhTWs = {
  ...zhTW,
  ...zhTWView
}

const ens = {
  ...en,
  ...enView
}

const i18n = new VueI18n({
  locale: localStore.get('locale') || 'zhCN',
  messages: {
    zhCN: zhCNs,
    zhTW: zhTWs,
    en: ens
  }
})

export default i18n

