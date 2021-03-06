const fetch = require("node-fetch")

const tokenEndpoint = "https://github.com/login/oauth/access_token"

/**
 * Generates a URL from which an access token for the current user can be requested.
 *
 * @param {object} options Parameters for the token API call
 * @param {string} options.code The access code obtained during the OAuth flow
 * @param {string} options.endpoint
 * @param {string} options.clientId
 * @param {string} options.secret
 * @returns {string} Request URL for the access token
 */
function getAccessTokenUrl(options) {
  const { endpoint, clientId, secret, code } = options

  if (!(endpoint && clientId && secret)) {
    throw new Error("Token URL, client ID and/or client secret are missing")
  }

  const url = new URL(endpoint)
  url.searchParams.append("client_id", clientId)
  url.searchParams.append("client_secret", secret)
  url.searchParams.append("code", code)

  return url
}

/**
 * Requests an access token for the current user.
 */
exports.handler = async function (event) {
  const { code } = event.queryStringParameters

  if (!code) {
    return {
      statusCode: 500,
      body: "The code parameter cannot be empty",
    }
  }

  const url = getAccessTokenUrl({
    code,
    endpoint: tokenEndpoint,
    clientId: process.env.VITE_APP_AUTH_CLIENT_ID,
    secret: process.env.AUTH_CLIENT_SECRET,
  })

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })

  const content = await response.json()

  if (!response.ok || content?.error) {
    return {
      statusCode: 500,
      body: "Something went wrong when fetching the token from GitHub",
    }
  } else {
    return {
      statusCode: 200,
      body: content.access_token,
    }
  }
}
