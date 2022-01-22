export default {
  repository: "https://github.com/andreasphil/stargaze",
  authorWebsite: "https://andreasphil.com",
  author: "Andreas Philippi",

  /**
   * Returns a document title for the specified page. If `page` is empty,
   * only the app name is returned.
   */
  title: (page?: string) => `${page ? `${page} | ` : ""}Stargaze`,
}
