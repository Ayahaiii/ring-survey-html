// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from './utils/api'
import { baseUrl, baseAuthUrl, httpGet, httpPost, httpPostIsAnonymous, httpPostToken, } from './utils/httpService'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/base.css';
import './assets/style/element-variables.scss'
import './assets/style/reset.scss'
import './assets/style/iconfont.css'
import './assets/font/iconfont.css'
import 'babel-polyfill'
import * as Util from './utils/utils'

// cookie
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.use(ElementUi)

// 跳转后返回顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
