import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  //iconUrl: require('leaflet/dist/images/marker-icon.png'),
  //iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  //shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
});*/


Vue.config.productionTip = false

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import { data } from '@/lib/lang/index.js'
const i18n = new VueI18n({
  locale: 'en', // デフォルト言語設定
  fallbackLocale: 'ja', // 選択中の言語に対応する文字列が存在しない場合はこの言語の文字列を使用する
  messages: data
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  i18n: i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
