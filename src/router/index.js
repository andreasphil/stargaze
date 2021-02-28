import { createRouter, createWebHistory } from "vue-router"
import requireLogin from "/@/router/require-login"
import updateHead from "/@/router/update-head"
import metadata from "/@/utils/metadata"
import Home from "/@/views/Home.vue"

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
    component: () => import("../views/Auth.vue"),
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
    component: () => import("../views/Stars.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(requireLogin)
router.afterEach((to) => updateHead({ title: to?.meta?.title }))

export default router
