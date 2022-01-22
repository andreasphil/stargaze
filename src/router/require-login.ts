import { isLoggedIn } from "/@/utils/api"
import type { NavigationGuard } from "vue-router"

/**
 * Checks whether an active session exists and redirects the user based
 * on the route's meta configuration.
 */
const requireLogin: NavigationGuard = (to, _, next) => {
  if (to.matched.some((route) => route.meta.requireLogin) && !isLoggedIn()) {
    // Login is required but no token exists
    next({ name: "Home" })
  } else if (
    to.matched.some((route) => route.meta.redirectWhenLoggedIn) &&
    isLoggedIn()
  ) {
    // Page is set to redirect somewhere else if a login token exists
    const redirect = to.matched
      .map((route) => route.meta)
      .find((routeMeta) => !!routeMeta.redirectWhenLoggedIn)

    if (redirect && redirect.redirectWhenLoggedIn) {
      next({ name: redirect.redirectWhenLoggedIn })
    } else {
      next()
    }
  } else {
    // Normal navigation
    next()
  }
}

export default requireLogin
