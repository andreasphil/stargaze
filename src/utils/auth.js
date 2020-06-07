/**
 * Generates a somewhat random string of numbers that can be used for validating OAuth
 * authorizations.
 *
 * See https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
 *
 * @returns {string} A random state identifier
 */
export const getState = () => {
  return Math.round(Math.random() * 10 ** 16).toString()
}

/**
 * Returns the URL of a page where the user can authorize the application.
 *
 * @param {string} state Unique session identifier
 * @returns {string} Authorization page URL
 */
export const getSignInUrl = state => {
  const url = new URL(process.env.VUE_APP_AUTH_URL)
  url.searchParams.append('state', state)
  url.searchParams.append('client_id', process.env.VUE_APP_AUTH_CLIENT_ID)
  url.searchParams.append('redirect_uri', process.env.VUE_APP_AUTH_REDIRECT_URL)
  url.searchParams.append('scope', 'read:user')

  return url.toString()
}

/**
 * Returns an access token that can be used for authenticating API requests.
 *
 * @param {string} code The code obtained during the OAuth flow
 * @returns {string} A promise of a string token
 */
export const getAccessToken = async code => {
  const url = new URL(process.env.VUE_APP_AUTH_TOKEN_URL)
  url.searchParams.append('code', code)

  const response = await fetch(url)
  const token = await response.text()

  return token
}
