import { createRouter, createWebHistory } from "vue-router";
import requireLogin from "/@/router/require-login";
import updateHead from "/@/router/update-head";
import metadata from "/@/utils/metadata";
import Error404 from "/@/views/404.vue";
import Auth from "/@/views/Auth.vue";
import Home from "/@/views/Home.vue";
import Stars from "/@/views/Stars.vue";

declare module "vue-router" {
  interface RouteMeta {
    redirectWhenLoggedIn?: string;
    title?: string;
    requireLogin?: boolean;
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      redirectWhenLoggedIn: "Stars",
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
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: Error404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(requireLogin);
router.afterEach((to) =>
  updateHead({ title: to?.meta?.title ?? metadata.title() })
);

export default router;
