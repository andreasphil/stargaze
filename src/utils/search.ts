import {
  default as initSearchDep,
  fullWordSplit,
  // @ts-expect-error Need to add type declarations
} from "js-inverted-index";

/**
 * Build a search index for a list of starred repositories.
 */
export default function initSearch(documents: Array<unknown>) {
  const { search, add } = initSearchDep({
    fields: ["name", "owner.login", "description", "primaryLanguage.name"],

    // Tokenize words as the word itself as well as anything that would return
    // true if used with `startsWith`, e.g. for dog, return d, do, and dog.
    tokenizer: (input: string) => {
      const inputWords: string[] = fullWordSplit(input);
      const tokens = new Set();

      inputWords
        .filter((word) => word.length > 0)
        .forEach((word) => {
          for (let i = 1; i <= word.length; i++) {
            tokens.add(word.substring(0, i));
          }
        });

      return Array.from(tokens);
    },
  });

  add(documents);

  return search;
}
