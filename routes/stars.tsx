import StarsList from "$/islands/starsList.tsx";
import { getStars, getViewer, type Star, type Viewer } from "$/utils/api.ts";
import { useError, withLayout } from "$/utils/lib.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import createSearch, { startsWith } from "js-inverted-index/index.ts";
import { SearchIndexDump } from "js-inverted-index/types.ts";
import { getCookies } from "std/http/cookie.ts";

type StarsPageProps = PageProps<{
  viewer: Viewer;
  stars: Star[];
  index: SearchIndexDump;
}>;

export const handler: Handlers<StarsPageProps["data"]> = {
  async GET(request, ctx) {
    const { token } = getCookies(request.headers);

    if (!token) {
      return new Response(null, {
        headers: { Location: "/" },
        status: 302,
      });
    }

    try {
      const viewer = await getViewer(token);
      const stars = await getStars(token);

      const index = createSearch({
        fields: ["name", "owner.login", "description", "primaryLanguage.name"],
        tokenizer: startsWith,
      });

      index.add(stars);

      return ctx.render({ viewer, stars, index: index.dump() });
    } catch (e) {
      return useError((e as Error).message);
    }
  },
};

export default function Stars(props: StarsPageProps) {
  return withLayout(
    <div data-trim="both" className="stars">
      <StarsList
        stars={props.data.stars}
        index={props.data.index}
        avatarUrl={props.data.viewer.avatarUrl}
      />
    </div>,
  );
}
