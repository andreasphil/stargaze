import type { Handler } from "@netlify/functions"
import { setLoginCookie } from "./utils/cookie"

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: setLoginCookie(undefined),
  }
}
