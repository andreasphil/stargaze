import { useConfig, withLayout } from "$/utils/lib.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

/* -------------------------------------------------- *
 * Utilities                                          *
 * -------------------------------------------------- */

/** Constructs the URL of GitHub's oauth authorization page. */
function getSigninUrl(host: string) {
  const config = useConfig();

  const url = new URL(config.api.oauthUrl);
  const state = Math.round(Math.random() * 10 ** 16).toString();
  const redirectUri = `${host}${config.api.oauthSuccessUrl}`;

  url.searchParams.append("state", state);
  url.searchParams.append("client_id", config.api.clientId);
  url.searchParams.append("scope", "read:user");
  url.searchParams.append("redirect_uri", redirectUri);

  return url.toString();
}

/* -------------------------------------------------- *
 * Handler                                            *
 * -------------------------------------------------- */

type HomePageProps = PageProps<{
  signInUrl: string;
}>;

export const handler: Handlers<HomePageProps["data"]> = {
  GET(request, ctx) {
    const { token } = getCookies(request.headers);

    // Redirect if we have an active session
    if (token) {
      return new Response(null, {
        headers: { Location: "/stars" },
        status: 302,
      });
    }

    // Otherwise generate the signin URL and render the page
    const host = new URL(request.url).origin;
    const signInUrl = getSigninUrl(host);
    return ctx.render({ signInUrl });
  },
};

export default function Home({ data }: HomePageProps) {
  return withLayout(
    <div data-trim="both" className="home">
      <img width="64px" height="64px" src="/icon-192.png" />
      <hgroup className="home__title">
        <h1>Stargaze</h1>
        <p>
          A faster way of browsing and searching your starred repositories on
          GitHub.
        </p>
      </hgroup>
      <a href={data.signInUrl} role="button">
        🐱 Sign in with GitHub
      </a>
    </div>,
  );
}
