export const api = {
  endpoint: "https://api.github.com/graphql",
  oauthStart: "https://github.com/login/oauth/authorize",
}

export async function getViewer() {
  return new Promise((resolve) => {
    resolve({
      name: "Max Muster",
      avatarUrl: "#",
    })
  })
}

export async function getStars() {
  return new Promise((resolve) => {
    resolve([])
  })
}
