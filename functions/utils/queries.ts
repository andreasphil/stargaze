import fetch from "node-fetch"

export const config = {
  endpointUrl: "https://api.github.com/graphql",
  tokenEndpointUrl: "https://github.com/login/oauth/access_token",
}

/** Creates a query for the current user. */
const viewerQuery = (): string => {
  return JSON.stringify({
    query: `
      query {
        viewer {
          name
          avatarUrl
        }
      }
    `,
  })
}

/** Creates a query for a list of starred repositories. */
const starsQuery = (cursor: string): string => {
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
                owner {
                  avatarUrl
                  login
                  url
                }
                description
                descriptionHTML
                url
                homepageUrl
                primaryLanguage {
                  name
                }
              }
            }
          }
        }
      }
    `,
  })
}

/** Posts a GraphQL query to the API. */
const post = async (query: string, bearer: string): Promise<any> => {
  const response = await fetch(config.endpointUrl, {
    method: "POST",
    body: query,
    headers: {
      Authorization: bearer,
    },
  })

  if (!response.ok) {
    throw response
  }

  return response.json()
}

/** Fetches the current viewer. */
export const getViewer = async (bearer: string): Promise<any> => {
  const response = await post(viewerQuery(), bearer)
  return response.data.viewer
}

/**
 * Fetches a list of all stars. If the user has starred more repositories than
 * the API returns in one batch, keeps fetching until the list is complete.
 * This is because the API currently offers no way of filtering stars on the
 * backend side, so we're going to need the complete set and implement it
 * in the frontend.
 */
export const getStars = async (bearer: string): Promise<any> => {
  const allStars = []
  let hasNext = true
  let cursor = undefined

  while (hasNext) {
    const response = await post(starsQuery(cursor), bearer)
    allStars.push(...response.data.viewer.starredRepositories.edges)

    hasNext = response?.data?.viewer?.starredRepositories?.pageInfo?.hasNextPage
    cursor = response?.data?.viewer?.starredRepositories?.pageInfo?.endCursor
  }

  return allStars
}
