import type { Handler, HandlerResponse } from "@netlify/functions"
import { requestAccessToken } from "./utils/auth"
import { setLoginCookie } from "./utils/cookie"

export const handler: Handler = async (event) => {
  const { code } = event.queryStringParameters
  let response: HandlerResponse

  try {
    const token = await requestAccessToken(code)
    response = {
      statusCode: 200,
      headers: {
        ...setLoginCookie(token),
        "Content-Type": "text/plain",
      },
    }
  } catch (e) {
    response = {
      statusCode: 500,
      body: (e as Error)?.message,
      headers: { "Content-Type": "text/plain" },
    }
  }

  return response
}
