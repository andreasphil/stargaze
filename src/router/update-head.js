/**
 * Applies values defined in the `opts` parameter to the document head.
 *
 * @param {Object} opts Changes to the document head
 * @param {string} opts.title The new document title
 */
export default function updateHead(opts) {
  document.title = opts.title
}
