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
