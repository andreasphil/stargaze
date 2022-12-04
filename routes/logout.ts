import { Handlers } from "$fresh/server.ts";
import { deleteCookie } from "std/http/cookie.ts";

/* -------------------------------------------------- *
 * Handler                                            *
 * -------------------------------------------------- */

export const handler: Handlers = {
  GET(request) {
    const headers = new Headers(request.headers);
    headers.set("Location", "/");
    deleteCookie(headers, "token", { path: "/" }); // also see login.tsx

    return new Response(null, { headers, status: 302 });
  },
};
