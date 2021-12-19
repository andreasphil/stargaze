import fetch from "node-fetch"
import { config } from "./queries"

/**
 * Generates a URL from which an access token for the current user can be
 * requested.
 */
const getAccessTokenUrl = (options: {
  code: string
  endpoint: string
  clientId: string
  secret: string
}): string => {
  const { endpoint, clientId, secret, code } = options

  if (!(endpoint && clientId && secret)) {
    throw new Error("Token URL, client ID and/or client secret are missing")
  }

  const url = new URL(endpoint)
  url.searchParams.append("client_id", clientId)
  url.searchParams.append("client_secret", secret)
  url.searchParams.append("code", code)

  return url.toString()
}

/** Requests an access token for the current user. */
export const requestAccessToken = async (code: string): Promise<string> => {
  if (!code) {
    throw new Error("The code parameter cannot be empty")
  }

  const url = getAccessTokenUrl({
    code,
    endpoint: config.tokenEndpointUrl,
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
    throw new Error("Something went wrong when fetching the token from GitHub")
  } else {
    return content.access_token
  }
}
