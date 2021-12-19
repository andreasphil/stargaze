import type { Handler } from "@netlify/functions"
import type { Response } from "node-fetch"
import { getLoginCookie } from "./utils/cookie"
import { getViewer } from "./utils/queries"

export const handler: Handler = async (event) => {
  const auth = getLoginCookie(event.headers)
  let statusCode = 200
  let body: string

  try {
    const response = await getViewer(auth)
    body = JSON.stringify(response)
  } catch (e) {
    const response = e as Response
    if (response?.status) {
      statusCode = response.status
      body = response.statusText
    } else {
      statusCode = 500
    }
  }

  return {
    statusCode,
    body,
    headers: {
      "Content-Type": "application/json",
    },
  }
}
