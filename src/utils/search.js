import { default as initSearchDep, fullWordSplit } from "js-inverted-index"

/**
 * Build a search index for a list of starred repositories.
 *
 * @param {Array} documents
 */
export default function initSearch(documents) {
  const { search, add } = initSearchDep({
    fields: ["name", "owner.login", "description", "primaryLanguage.name"],

    identifier: (i) => i.id,

    // Tokenize words as the word itself as well as anything that would return
    // true if used with `startsWith`, e.g. for dog, return d, do, and dog.
    tokenizer: (input) => {
      const inputWords = fullWordSplit(input)
      const tokens = new Set()

      inputWords
        .filter((word) => word.length > 0)
        .forEach((word) => {
          for (let i = 1; i <= word.length; i++) {
            tokens.add(word.substring(0, i))
          }
        })

      return Array.from(tokens)
    },
  })

  add(documents)

  return search
}
