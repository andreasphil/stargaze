import { Head } from "$fresh/src/runtime/head.ts";
import { ComponentChildren } from "preact";
import "std/dotenv/load.ts";

/* -------------------------------------------------- *
 * Static stuff / constants                           *
 * -------------------------------------------------- */

export const META = {
  title: "Stargaze",
  authorName: "Andreas Philippi",
  authorWebsite: "https://andreasphil.com",
  repository: "https://github.com/andreasphil/stargaze",
} as const;

export function useConfig() {
  return {
    api: {
      clientId: Deno.env.get("API_CLIENT_ID") ?? "",
      secret: Deno.env.get("API_SECRET") ?? "",
      accessTokenEndpoint: "https://github.com/login/oauth/access_token",
      graphqlEndpoint: "https://api.github.com/graphql",
      oauthUrl: "https://github.com/login/oauth/authorize",
      oauthSuccessUrl: "/login",
      loginRedirect: "/stars",
    },
  };
}

/* -------------------------------------------------- *
 * Utilities                                          *
 * -------------------------------------------------- */

export function useError(message: string, status = 500) {
  const error = Response.json({ message }, { status });
  return error;
}

/* -------------------------------------------------- *
 * Components                                         *
 * -------------------------------------------------- */

export function withLayout(children: ComponentChildren) {
  return (
    <>
      <Head>
        <title>{META.title}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <div data-container>{children}</div>

      <footer data-container className="footer">
        <small>
          A thing made by <a href={META.authorWebsite}>{META.authorName}</a>. 🐱
          {" "}
          <a href={META.repository}>View source</a>.
        </small>
      </footer>
    </>
  );
}
