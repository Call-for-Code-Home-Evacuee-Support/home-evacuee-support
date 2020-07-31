import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
//import Geocoder from "@pderas/vue2-geocoder";

import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.use(BootstrapVueIcons)

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.config.productionTip = false

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import { data } from '@/lib/lang/index.js'
const i18n = new VueI18n({
  locale: 'en', // デフォルト言語設定
  fallbackLocale: 'ja', // 選択中の言語に対応する文字列が存在しない場合はこの言語の文字列を使用する
  messages: data
})

/*Vue.use(Geocoder, {
  defaultCountryCode: null, // e.g. 'CA'
  defaultLanguage:    null, // e.g. 'en'
  defaultMode:        'address', // or 'lat-lng'
  googleMapsApiKey:   GOOGLE_MAPS_API_KEY
});*/

new Vue({
  i18n: i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
