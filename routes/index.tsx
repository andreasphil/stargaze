import { useConfig, withLayout } from "$/utils/lib.tsx";
import { Handlers } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

/* -------------------------------------------------- *
 * Utilities                                          *
 * -------------------------------------------------- */

/** Constructs the URL of GitHub's oauth authorization page. */
function getSigninUrl() {
  const config = useConfig();

  const url = new URL(config.api.oauthUrl);
  const state = Math.round(Math.random() * 10 ** 16).toString();
  const redirectUri = `${config.host}${config.api.oauthSuccessUrl}`;

  url.searchParams.append("state", state);
  url.searchParams.append("client_id", config.api.clientId);
  url.searchParams.append("scope", "read:user");
  url.searchParams.append("redirect_uri", redirectUri);

  return url.toString();
}

/* -------------------------------------------------- *
 * Handler                                            *
 * -------------------------------------------------- */

export const handler: Handlers = {
  GET(request, ctx) {
    const { token } = getCookies(request.headers);

    if (token) {
      return new Response(null, {
        headers: { Location: "/stars" },
        status: 302,
      });
    }

    return ctx.render();
  },
};

export default function Home() {
  const signInUrl = getSigninUrl();

  return withLayout(
    <div data-trim="both" className="home">
      <hgroup className="home__title">
        <h1>Stargaze</h1>
        <p>
          A faster way of browsing and searching your starred repositories on
          GitHub.
        </p>
      </hgroup>
      <a href={signInUrl} role="button" data-variant="outline">
        🐱 Sign in with GitHub
      </a>
    </div>,
  );
}
