import { config } from "/@/utils/api"

/**
 * Name of the localStorage item where the token is saved
 */
const loginTokenName = "auth-key"

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
 * Returns an access token that can be used for authenticating API requests.
 *
 * @param {string} code The code obtained during the OAuth flow
 * @returns {Promise<string>} A promise of a string token
 */
export const fetchLoginToken = async (code) => {
  const response = await fetch(config.tokenUrl(code))

  if (!response.ok) {
    throw new Error()
  }

  return response.text()
}

/**
 * Checks if a login token exists in local storage. Note that this says nothing
 * about the validity of the token.
 *
 * @returns {boolean}
 */
export function loginTokenExists() {
  const token = getLoginToken()
  return !!token && token.trim() !== ""
}

/**
 * Retrieves a saved login token.
 *
 * @returns {string}
 */
export function getLoginToken() {
  return localStorage.getItem(loginTokenName)
}

/**
 * Saves a login token.
 *
 * @param {string} token
 */
export function setLoginToken(token) {
  localStorage.setItem(loginTokenName, token)
}

/**
 * Removes the login token and all locally saved data of the current session.
 */
export function logout() {
  localStorage.clear()
}
