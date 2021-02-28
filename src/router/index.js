import { createRouter, createWebHistory } from "vue-router"
import requireLogin from "/@/router/require-login"
import updateHead from "/@/router/update-head"
import metadata from "/@/utils/metadata"
import Home from "/@/views/Home.vue"
import Auth from "/@/views/Auth.vue"
import Stars from "/@/views/Stars.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      redirectWhenLoggedIn: "Stars",
      title: metadata.title(),
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    meta: {
      redirectWhenLoggedIn: "Stars",
      title: metadata.title("You're being logged in ..."),
    },
  },
  {
    path: "/stars",
    name: "Stars",
    meta: {
      requireLogin: true,
      title: metadata.title("Starred repositories"),
    },
    component: Stars,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(requireLogin)
router.afterEach((to) => updateHead({ title: to?.meta?.title }))

export default router
