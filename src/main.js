import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import VideoPlayer from 'vue-video-player'
import { Lazyload } from 'vant';
import { storage } from './assets/common';

import './assets/iconfont.css'
import './assets/reset.css'
import 'amfe-flexible';
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css');
require('./assets/videoCss.css');

Vue.use(Lazyload, { loading: 'https://static.oschina.net/uploads/img/201409/26073952_Vd2W.gif' });
Vue.use(VideoPlayer);

Vue.config.productionTip = false

Axios.defaults.baseURL = 'http://39.108.131.220:4000'
// Axios.defaults.baseURL = 'http://39.108.131.220:4000'
Axios.defaults.withCredentials = true;
Vue.prototype.$http = Axios;
Vue.prototype.storage = storage;




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
