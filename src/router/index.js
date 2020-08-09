import Auth from '@/views/Auth.vue'
import Home from '@/views/Home.vue'
import metadata from '@/utils/metadata'
import requireLogin from '@/router/require-login'
import updateHead from '@/router/update-head'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      redirectWhenLoggedIn: 'Stars',
      title: metadata.title()
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      redirectWhenLoggedIn: 'Stars',
      title: metadata.title('Your being logged in ...')
    }
  },
  {
    path: '/stars',
    name: 'Stars',
    meta: {
      requireLogin: true,
      title: metadata.title('Starred repositories')
    },
    component: () =>
      import(/* webpackChunkName: "stars" */ '../views/Stars.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(requireLogin)
router.afterEach(to => updateHead({ title: to?.meta?.title }))

export default router
