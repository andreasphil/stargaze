import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/stars',
    name: 'Stars',
    component: () =>
      import(/* webpackChunkName: "stars" */ '../views/Stars.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
