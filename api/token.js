import fetch from "node-fetch"

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
export default async function (req, res) {
  const { code } = req.query

  if (!code) {
    res.status(500).send("The code parameter cannot be empty")
    return
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
    res
      .status(500)
      .send("Something went wrong when fetching the token from GitHub")
  } else {
    res.status(200).send(content.access_token)
  }
}
