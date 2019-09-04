import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
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
      children: [
        {
          path: '',
          redirect: 'find'
        }, {
          path: 'me',
          component: () => import('../views/home/children/me')
        }, {
          path: 'find',
          meta: { keepAlive: true },
          component: () => import('../views/home/children/find')
        }, {
          path: 'burg',
          component: () => import('../views/home/children/burg')
        }, {
          path: 'video',
          component: () => import('../views/home/children/video')
        }]
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('../views/music/index'),
      children: [
        {
          path: '',
          redirect: 'lyric'
        }, {
          path: 'cover',
          component: () => import('../views/music/children/cover')
        }, {
          path: 'lyric',
          component: () => import('../views/music/children/lyric')
        }]
    }
  ]
})

// 懒加载： component: () => import('../views/home.vue')