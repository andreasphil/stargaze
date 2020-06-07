import { loginTokenExists } from '../vue-apollo'
import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      redirectWhenAuthenticated: 'Stars'
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      redirectWhenAuthenticated: 'Stars'
    }
  },
  {
    path: '/stars',
    name: 'Stars',
    meta: {
      requireAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "stars" */ '../views/Stars.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, _, next) => {
  if (to.matched.some(route => route.meta.requireAuth) && !loginTokenExists()) {
    // Login is required but not token exists
    next({ name: 'Home' })
  } else if (
    to.matched.some(route => route.meta.redirectWhenAuthenticated) &&
    loginTokenExists()
  ) {
    // Page is set to redirect somewhere else if a login token exists
    const redirect = to.matched
      .map(route => route.meta)
      .find(routeMeta => !!routeMeta.redirectWhenAuthenticated)

    next({ name: redirect.redirectWhenAuthenticated })
  } else {
    // Normal navigation
    next()
  }
})

export default router
