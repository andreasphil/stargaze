/**
 * Applies values defined in the `opts` parameter to the document head.
 */
export default function updateHead(opts: { title: string }) {
  document.title = opts.title;
}
