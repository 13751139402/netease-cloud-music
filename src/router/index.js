import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: "login"
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index'),
  },
  {
    path: '/userName',
    name: 'userName',
    component: () => import('../views/login/userName')
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import('../views/login/signIn')
  },
  {
    path: '/home',
    name: 'home',
    meta: { transitionType: 'hideDown', keepAlive: true },
    component: () => import('../views/home/index'),
  },
  {
    path: '/music',
    name: 'music',
    component: () => import('../views/music/index'),
  },
  {
    path: '/songComment',
    name: 'songComment',
    component: () => import('../views/music/comment'),
  }
]
export default new Router({
  routes,
})