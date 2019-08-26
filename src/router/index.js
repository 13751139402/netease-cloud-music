import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta: { transitionType: 'hideDown' },
      component: () => import('../views/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      meta: { transitionType: 'hideDown' },
      component: () => import('../views/home.vue')
    }
  ]
})
