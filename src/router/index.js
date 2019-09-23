import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: "search"
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
        redirect: "details"
      },
      {
        path: 'hot',
        component: () => import('../views/search/children/searchHot'),
      },
      {
        path: 'details',
        name: 'searchDetails',
        component: () => import('../views/search/children/searchDetails'),
      },
    ],
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
    meta: {
      keepAlive: true,
    },
    component: () => import('../views/music/index')
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
      scrollEl: "list_main",
      scrollTop: 0,
    },
    component: () => import('../views/playList/index')
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