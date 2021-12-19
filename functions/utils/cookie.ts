import { parse, serialize } from "cookie"

/** Returns the cookie header with the auth token for a response */
export const setLoginCookie = (token: string) => {
  return {
    "Set-Cookie": token
      ? serialize("Authorization", `bearer ${token}`, {
          httpOnly: true,
          maxAge: 604800,
        })
      : serialize("Authorization", "", { maxAge: 0, httpOnly: true }),
  }
}

/** Extracts the auth token from a request header */
export const getLoginCookie = (headers: { cookie?: string }) => {
  if (!headers.cookie) {
    return undefined
  }

  const cookies = parse(headers.cookie)
  return cookies.Authorization
}
