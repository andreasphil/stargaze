import { useConfig } from "$/utils/lib.tsx";
import { ofetch } from "ofetch";

/* -------------------------------------------------- *
 * Viewer                                             *
 * -------------------------------------------------- */

export type Viewer = {
  name: string;
  avatarUrl: string;
};

export type ViewerResponse = {
  data: {
    viewer: Viewer;
  };
};

/** Creates a query for the current user. */
function viewerQuery(): string {
  return JSON.stringify({
    query: `
      query {
        viewer {
          name
          avatarUrl
        }
      }
    `,
  });
}

/** Fetches the current viewer. */
export async function getViewer(token: string): Promise<Viewer> {
  const config = useConfig();

  const response = await ofetch<ViewerResponse>(config.api.graphqlEndpoint, {
    method: "POST",
    body: viewerQuery(),
    headers: { Authorization: `bearer ${token}` },
  });

  return response.data.viewer;
}

/* -------------------------------------------------- *
 * Stars                                              *
 * -------------------------------------------------- */

export type Star = {
  id: string;
  name: string;
  description: string;
  descriptionHTML: string;
  url: string;
  homepageUrl: string;
  owner: {
    login: string;
    url: string;
    avatarUrl: string;
  };
  primaryLanguage: {
    name: string;
  };
};

export type StarsResponse = {
  data: {
    viewer: {
      starredRepositories: {
        pageInfo: { hasNextPage: boolean; endCursor: string };
        edges: { node: Star }[];
      };
    };
  };
};

/** Creates a query for a list of starred repositories. */
function starsQuery(cursor?: string): string {
  return JSON.stringify({
    query: `
      query {
        viewer {
          starredRepositories(
            after: ${cursor ? `"${cursor}"` : null}
            orderBy: { direction: DESC, field: STARRED_AT }
          ) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                name
                description
                descriptionHTML
                url
                homepageUrl
                owner {
                  avatarUrl
                  login
                  url
                }
                primaryLanguage {
                  name
                }
              }
            }
          }
        }
      }
    `,
  });
}

/**
 * Fetches a list of all stars. If the user has starred more repositories than
 * the API returns in one batch, keeps fetching until the list is complete.
 * This is because the API currently offers no way of filtering stars on the
 * backend side, so we're going to need the complete set and implement it
 * in the frontend.
 */
export async function getStars(token: string): Promise<Star[]> {
  const config = useConfig();
  const all: Star[] = [];
  let hasNext = true;
  let cursor: string | undefined = undefined;

  while (hasNext) {
    const query = starsQuery(cursor);
    const response = await ofetch<StarsResponse>(config.api.graphqlEndpoint, {
      method: "POST",
      body: query,
      headers: { Authorization: `bearer ${token}` },
    });

    response.data.viewer.starredRepositories.edges.forEach(({ node }) =>
      all.push(node)
    );

    hasNext = response.data.viewer.starredRepositories.pageInfo.hasNextPage;
    cursor = response.data.viewer.starredRepositories.pageInfo.endCursor;
  }

  return all;
}
