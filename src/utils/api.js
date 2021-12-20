export const config = {
  oauthStartUrl: "https://github.com/login/oauth/authorize",
  loginUrl: (code) => `/.netlify/functions/login?code=${code}`,
  logoutUrl: "/.netlify/functions/logout",
  viewerUrl: "/.netlify/functions/viewer",
  starsUrl: "/.netlify/functions/stars",
}

/**
 * Generates a somewhat random string of numbers that can be used for
 * validating OAuth authorizations.
 *
 * See https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
 *
 * @returns {string}
 */
export const getState = () => {
  return Math.round(Math.random() * 10 ** 16).toString()
}

/**
 * Returns the URL of a page where the user can authorize the application.
 *
 * @param {object} options Parameters for constructing the URL
 * @param {string} options.state
 * @param {string} options.clientId
 * @param {string} options.redirectTo
 * @returns {string}
 */
export const getSignInUrl = ({ state, clientId, redirectTo }) => {
  const url = new URL(config.oauthStartUrl)
  url.searchParams.append("state", state)
  url.searchParams.append("client_id", clientId)
  url.searchParams.append("scope", "read:user")
  url.searchParams.append("redirect_uri", redirectTo)

  return url.toString()
}

/**
 * Checks if a login token exists in local storage. Note that this says nothing
 * about the validity of the token.
 *
 * @returns {boolean}
 */
export function isLoggedIn() {
  return localStorage.getItem("logged_in") === "true"
}

/**
 * Returns an access token that can be used for authenticating API requests.
 *
 * @param {string} code The code obtained during the OAuth flow
 * @returns {Promise<string>} A promise of a string token
 */
export async function login(code) {
  const response = await fetch(config.loginUrl(code))

  if (!response.ok) {
    localStorage.removeItem("logged_in")
    throw new Error(response.status)
  }

  localStorage.setItem("logged_in", "true")
}

/**
 * Removes the login token and all locally saved data of the current session.
 */
export async function logout() {
  try {
    const response = await fetch(config.logoutUrl)
    if (!response.ok) {
      throw new Error(response.status)
    }
  } catch {
    // Serverside-logout failed, log out locally anyways
  } finally {
    localStorage.clear()
  }
}
