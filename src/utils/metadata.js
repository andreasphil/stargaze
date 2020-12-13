export default {
  repository: "https://github.com/andreasphil/stargaze",
  authorWebsite: "https://andreasphil.com",
  author: "Andreas Philippi",

  /**
   * Returns a document title for the specified page. If `page` is empty, only the app name
   * is returned.
   *
   * @param {string} page Optional page title
   * @returns Document title including page and app name
   */
  title: page => `${page ? `${page} | ` : ""}Stargaze`,
}
