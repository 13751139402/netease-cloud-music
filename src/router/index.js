import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
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
    meta: {
      keepAlive: true,
    },
    component: () => import('../views/music/index')
  },
  {
    path: '/musicComment',
    name: 'musicComment',
    component: () => import('../views/music/comm'),
    children: [{
      path: '/',
      redirect: 'song',
    },
    {
      path: 'song',
      name: 'song',
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