import LoginRedirect from "$/islands/loginRedirect.tsx";
import { useConfig, useError, withLayout } from "$/utils/lib.tsx";
import { Handlers } from "$fresh/server.ts";
import { ofetch } from "ofetch";
import { setCookie } from "std/http/cookie.ts";

/* -------------------------------------------------- *
 * Types                                              *
 * -------------------------------------------------- */

type RequestAccessTokenResponse = {
  error?: string;
  access_token?: string;
};

/* -------------------------------------------------- *
 * Utilities                                          *
 * -------------------------------------------------- */

/**
 * Generates a URL from which an access token for the current user can be
 * requested.
 */
function getAccessTokenUrl(options: {
  code: string;
  endpoint: string;
  clientId: string;
  secret: string;
}): string {
  const { endpoint, clientId, secret, code } = options;

  if (!(endpoint && clientId && secret)) {
    throw new Error("Token URL, client ID and/or client secret are missing");
  }

  const url = new URL(endpoint);
  url.searchParams.append("client_id", clientId);
  url.searchParams.append("client_secret", secret);
  url.searchParams.append("code", code);

  return url.toString();
}

/** Requests an access token for the current user. */
async function requestAccessToken(code: string): Promise<string> {
  const config = useConfig();

  const url = getAccessTokenUrl({
    code,
    endpoint: config.api.accessTokenEndpoint,
    clientId: config.api.clientId,
    secret: config.api.secret,
  });

  const response = await ofetch<RequestAccessTokenResponse>(url, {
    method: "POST",
    headers: { Accept: "application/json" },
  });

  if (response.error) throw new Error(response.error);
  else if (!response.access_token) {
    throw new Error("Something went wrong while fetching the token");
  }

  return response.access_token;
}

/* -------------------------------------------------- *
 * Handler                                            *
 * -------------------------------------------------- */

export const handler: Handlers = {
  async GET(request, ctx) {
    const query = new URL(request.url).searchParams;
    const code = query.get("code");
    if (!code) return useError("Missing code");

    try {
      const token = await requestAccessToken(code);
      const response = await ctx.render();

      setCookie(response.headers, {
        name: "token",
        value: token,
        httpOnly: true,
        maxAge: 31536000, // ~ 1 year
        path: "/",
        sameSite: "Strict",
      }); // also see logout.ts

      return response;
    } catch (e) {
      return useError((e as Error).message);
    }
  },
};

export default function Login() {
  const config = useConfig();

  return withLayout(<LoginRedirect to={config.api.loginRedirect} />);
}
