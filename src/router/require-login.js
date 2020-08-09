import { loginTokenExists } from '../vue-apollo'

/**
 * Checks whether an active session exists and redirects the user based on the route's meta
 * configuration.
 *
 * @param {Route} to Target route
 * @param {Route} _ Original route (ignored by the handler)
 * @param {Function} next Callback when the guard has finished
 */
export default function requireLogin(to, _, next) {
  if (
    to.matched.some(route => route.meta.requireLogin) &&
    !loginTokenExists()
  ) {
    // Login is required but not token exists
    next({ name: 'Home' })
  } else if (
    to.matched.some(route => route.meta.redirectWhenLoggedIn) &&
    loginTokenExists()
  ) {
    // Page is set to redirect somewhere else if a login token exists
    const redirect = to.matched
      .map(route => route.meta)
      .find(routeMeta => !!routeMeta.redirectWhenLoggedIn)

    next({ name: redirect.redirectWhenLoggedIn })
  } else {
    // Normal navigation
    next()
  }
}
