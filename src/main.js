import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import './assets/iconfont.css'
import './assets/reset.css'
import 'amfe-flexible';
import { Lazyload } from 'vant';
import {storage} from './assets/common'
Vue.use(Lazyload);

Vue.config.productionTip = false

Axios.defaults.baseURL = 'http://39.108.131.220:4000'
// Axios.defaults.baseURL = 'http://39.108.131.220:4000'
Axios.defaults.withCredentials = true;
Vue.prototype.$http = Axios;
Vue.prototype.storage=storage;




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
