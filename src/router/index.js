/*
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-23 09:45:34
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-09 13:16:59
 */
import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
import home from "@/views/home";
import playList from "@/views/playList";
import music from "@/views/music/index";
Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: "login"
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('../components/video.vue'),
  },
  {
    path: '/search',
    component: () => import('../views/search/index'),
    children: [
      {
        path: "",
        redirect: "hot"
      },
      {
        path: 'hot',

        component: () => import('../views/search/children/searchHot'),
      },
      {
        path: 'details',
        name: 'searchDetails',
        meta: { keepAlive: true },
        component: () => import('../views/search/children/searchDetails'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login', meta: { keepAlive: true },
    component: () => import('../views/login/index'),
  },
  {
    path: '/userName',
    name: 'userName', meta: { keepAlive: true },
    component: () => import('../views/login/userName')
  },
  {
    path: '/signIn',
    name: 'signIn', meta: { keepAlive: true },
    component: () => import('../views/login/signIn')
  },
  {
    path: '/home',
    name: 'home',
    meta: { keepAlive: true },
    component: home,
  },
  {
    path: '/music',
    name: 'music',
    meta: {
      keepAlive: true,
    },
    component: music
  },
  {
    path: '/comment',
    component: () => import('../views/music/comm'),
    children: [{
      path: '',
      redirect: "song"
    },
    {
      path: 'song',
      meta: {
        keepAlive: true,
        scrollEl: "scroll",
        scrollTop: 0,
      },
      component: () => import('../views/music/children/commSong'),
      beforeEnter: (to, from, next) => {
        if (from.path == "/music") {
          to.meta.scrollTop = 0;
        }
        next();
      },
    }, {
      path: 'hot',
      name: 'hot',
      component: () => import('../views/music/children/hotComm'),
    }
    ]
  },
  {
    path: '/playList',
    name: 'playList',
    meta: {
      keepAlive: true,
      scrollEl: "container",
      scrollTop: 0,
    },
    component: playList
  }
]



let router = new VueRouter({
  routes,
  scrollBehavior(to) {
    if (to.meta.keepAlive && to.meta.scrollEl) {
      const $content = document.querySelector(`#${to.meta.scrollEl}`);
      $content.scrollTop = to.meta.scrollTop;

    }
  }
})
router.beforeEach((to, from, next) => {
  if (from.meta.keepAlive && from.meta.scrollEl) {
    const $content = document.querySelector(`#${from.meta.scrollEl}`);
    const scrollTop = $content ? $content.scrollTop : 0;
    from.meta.scrollTop = scrollTop;
  }
  next();
})


export default router;