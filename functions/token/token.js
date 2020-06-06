const fetch = require('node-fetch')

/**
 * Generates a URL from which an access token for the current user can be requested.
 * @param {*} code The access code obtained during the OAuth flow
 */
const getAccessTokenUrl = code => {
  const {
    AUTH_TOKEN_URL,
    VUE_APP_AUTH_CLIENT_ID,
    AUTH_CLIENT_SECRET
  } = process.env

  if (!(AUTH_TOKEN_URL && VUE_APP_AUTH_CLIENT_ID && AUTH_CLIENT_SECRET)) {
    throw new Error('Token URL, client ID and/or client secret are missing')
  }

  const url = new URL(AUTH_TOKEN_URL)
  url.searchParams.append('client_id', VUE_APP_AUTH_CLIENT_ID)
  url.searchParams.append('client_secret', AUTH_CLIENT_SECRET)
  url.searchParams.append('code', code)

  return url
}

/**
 * Requests an access token for the current user.
 */
exports.handler = async (event, context) => {
  if (!event.queryStringParameters.code) {
    return { statusCode: 500, body: 'The code parameter cannot be empty' }
  }

  try {
    const url = getAccessTokenUrl(event.queryStringParameters.code)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      return {
        statusCode: 500,
        body: 'Something went wrong when fetching the token from GitHub'
      }
    }

    const responseData = await response.json()
    return { statusCode: 200, body: responseData.access_token }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
