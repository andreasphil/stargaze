import { getLoginToken, loginTokenExists } from "/@/utils/auth"

export const api = {
  endpoint: "https://api.github.com/graphql",
  oauthStart: "https://github.com/login/oauth/authorize",

  notAuthorized: "Not authorized",
  notLoggedIn: "Not logged in",
  otherError: "Something went wrong when requesting data from GitHub",
}

/**
 * Creates a query for the current user.
 *
 * @returns {string}
 */
function viewerQuery() {
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

/**
 * Creates a query for a list of starred repositories.
 *
 * @param {string} cursor Position of the start of the list
 * @returns {string}
 */
function starsQuery(cursor) {
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

/**
 * Posts a GraphQL query to the API.
 *
 * @param {string} query
 * @returns {Promise}
 */
async function post(query) {
  if (!loginTokenExists()) {
    throw new Error(api.notLoggedIn)
  }

  const response = await fetch(api.endpoint, {
    method: "POST",
    body: query,
    headers: {
      Authorization: `bearer ${getLoginToken()}`,
    },
  })

  if (!response.ok) {
    throw new Error(
      response.status === 401 ? api.notAuthorized : api.otherError
    )
  }

  return response.json()
}

/**
 * Fetches the current viewer.
 *
 * @returns {Promise}
 */
export async function getViewer() {
  const response = await post(viewerQuery())
  return response.data.viewer
}

/**
 * Fetches a list of all stars. If the user has starred more repositories than
 * the API returns in one batch, keeps fetching until the list is complete.
 * This is because the API currently offers no way of filtering stars on the
 * backend side, so we're going to need the complete set and implement it
 * in the frontend.
 *
 * @returns {Promise}
 */
export async function getStars() {
  const allStars = []
  let hasNext = true
  let cursor = undefined

  while (hasNext) {
    const response = await post(starsQuery(cursor))

    allStars.push(...response.data.viewer.starredRepositories.edges)

    hasNext = response?.data?.viewer?.starredRepositories?.pageInfo?.hasNextPage
    cursor = response?.data?.viewer?.starredRepositories?.pageInfo?.endCursor
  }

  return allStars
}
