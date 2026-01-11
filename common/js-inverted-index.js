/* -------------------------------------------------- *
 * Types                                              *
 * -------------------------------------------------- */

/**
 * Specifies a nested property inside an object.
 *
 * @typedef {string | string[]} PropPath
 */

/**
 * Strings or stuff that can be converted into a string.
 *
 * @typedef {string | { toString: () => string }} Stringable
 */

/**
 * Documents that can be added to the search index.
 *
 * @typedef {Record<string, unknown>} Searchable
 */

/**
 * Mapping of search terms to the IDs of matching documents.
 *
 * @typedef {Record<string, Set<string>>} SearchIndex
 */

/**
 * Search index with an ID array instead of a set (for JSON serialization).
 *
 * @typedef {Record<string, string[]>} SearchIndexDump
 */

/**
 * Takes a document and returns a value that can be used for uniquely
 * identifying the document.
 *
 * @template {Searchable} [T = any]
 * @template [U = string]
 * @callback IdentifierFn
 * @param {T} document Original document
 * @returns {U} Identifier of the document
 */

/**
 * Takes a string and splits it into individual tokens. These tokens will be
 * used for building the search index.
 *
 * @callback TokenizerFn
 * @param {string} input Source string
 * @returns {string[]} Tokens found in the source string
 */

/**
 * Takes a string and returns it in a normalized format, e.g. converts it to
 * lowercase and trim leading/trailing whitespace.
 *
 * @callback NormalizerFn
 * @param {string} input Source string
 * @returns {string} Normalized string
 */

/**
 * Takes and index and returns all search results for the specified term. Calls
 * to the function will also use the original indexing options. These can be
 * used for normalizing and tokenizing the search term in the same way the
 * documents in the index are in order to make matches more likely.
 *
 * @callback SearcherFn
 * @param {SearchIndex} index Index to search in
 * @param {string} term Term to search for
 * @param {IndexingOptions} options Options used for generating the index
 * @returns {Set<string>} Set of IDs of documents matching the term
 */

/**
 * Specifies configuration for building a search index.
 *
 * @typedef IndexingOptions
 * @prop {IdentifierFn} identifier Strategy for extracting an ID from a document.
 * @prop {TokenizerFn} tokenizer Strategy for splitting a value of a document into tokens.
 * @prop {NormalizerFn} normalizer Strategy for normalizing the format of the tokens.
 * @prop {SearcherFn} searcher Strategy for looking up terms in the index.
 * @prop {PropPath[]} fields An array containing the properties that should be indexed.
 */

/**
 * The closure returned when the search has been initialized. Contains methods
 * for interacting with the index, such as adding documents or searching.
 *
 * @template {Searchable} T
 * @typedef Search
 * @prop {(term: string) => T[]} search
 * @prop {(documents: T[]) => void} add
 * @prop {() => SearchIndexDump} dump
 * @prop {(index: SearchIndexDump, documents: T[]) => void} hydrate
 */

/* -------------------------------------------------- *
 * Helpers                                            *
 * -------------------------------------------------- */

/**
 * Recursively reads the value of a property from nested object structures. For
 * example:
 *
 * getNestedProp({ a: { b: 'value' }}, 'a.b') // => 'value'
 * getNestedProp({ a: { b: 'value' }}, ['a', 'b']) // => 'value'
 *
 * @param {Record<string, any>} obj
 * @param {PropPath} prop
 * @returns {Stringable | undefined}
 */
export function unwrap(obj, prop) {
  if (!obj) return undefined;

  const path = Array.isArray(prop) ? prop : prop.split(".");
  const [head, ...tail] = path;

  if (tail.length) return unwrap(obj[head], tail);
  else return obj[head];
}

/**
 * Returns the intersection of multiple sets.
 *
 * @template T
 * @param {Set<T>[]} sets Sets to get common elements from
 * @returns {Set<T>} Set containing the elements shared among the source sets
 */
export function intersect(...sets) {
  if (!sets.length || sets.some((set) => !set)) return new Set();
  else if (sets.length === 1) return sets[0];

  const setsCopy = [...sets];
  const a = setsCopy.shift();
  const b = setsCopy.shift();
  const intersection = new Set();

  a.forEach((itemFromA) => {
    if (b.has(itemFromA)) intersection.add(itemFromA);
  });

  setsCopy.unshift(intersection);

  return intersect(...setsCopy);
}

/**
 * Identifies documents by the value of a property.
 *
 * @template {Record<string, any>} T
 * @param {keyof T} prop
 * @returns {IdentifierFn<T>}
 */
export function idProp(prop) {
  return (document) => document[prop]?.toString?.();
}

/* -------------------------------------------------- *
 * Normalizers                                        *
 * -------------------------------------------------- */

/**
 * Removes leading/trailing whitespace and converts the value to lowercase.
 * @type {NormalizerFn}
 */
export const lowercaseTrim = (input) => input?.trim().toLowerCase();

/* -------------------------------------------------- *
 * Matchers                                           *
 * -------------------------------------------------- */

/**
 * Looks up all ID entries in the index for a search term. The search term is
 * split according to the provided matcher expression. If the term consists of
 * multiple words, only results containing all words are returned.
 *
 * @type {SearcherFn}
 */
export const matchAllTerms = (index, term, options) => {
  if (!term || Object.keys(index).length === 0) {
    return new Set();
  }

  const { tokenizer, normalizer } = options;
  const termTokens = tokenizer(term).map((token) => normalizer(token));
  const matches = termTokens.map((token) => index[token]);

  return intersect(...matches);
};

/* -------------------------------------------------- *
 * Tokenizers                                         *
 * -------------------------------------------------- */

/**
 * Returns a new tokenizer that splits a value based on the specified regex.
 *
 * @param {RegExp} exp
 * @returns {TokenizerFn}
 */
export function regexSplit(exp) {
  return (input) => (input ? input.match(exp) || [] : []);
}

/**
 * Returns a tokenizer that splits values on word boundaries.
 */
export const fullWordSplit = regexSplit(/\w+/g);

/**
 * Returns a tokenizer that returns the word itself as well as anything that
 * that would return true if used with `startsWith`, e.g. for dog, return d,
 * do, and dog.
 *
 * @type {TokenizerFn}
 */
export const startsWith = (input) => {
  const inputWords = fullWordSplit(input);
  const tokens = new Set();

  inputWords
    .filter((word) => word.length > 0)
    .forEach((word) => {
      for (let i = 1; i <= word.length; i++) {
        tokens.add(word.substring(0, i));
      }
    });

  return Array.from(tokens);
};

/* -------------------------------------------------- *
 * Search index                                       *
 * -------------------------------------------------- */

/**
 * Creates a new search index and returns functions for interacting with it.
 *
 * @template {Searchable} T
 * @param {Partial<IndexingOptions>} [options={}]
 * @returns {Search<T>}
 */
export default function createSearch(options = {}) {
  // Merge custom and default options
  /** @type {IndexingOptions} */
  const effectiveOptions = {
    tokenizer: fullWordSplit,
    identifier: idProp("id"),
    normalizer: lowercaseTrim,
    searcher: matchAllTerms,
    fields: [],
    ...options,
  };

  /**
   * Map of possible search terms -> document IDs
   * @type {SearchIndex}
   */
  let index = Object.create(null);

  /**
   * Map of document IDs -> original documents
   * @type {Record<string, T>}
   */
  let indexedDocuments = {};

  /** @type {Search<T>["search"]} */
  const search = (term) => {
    /** @type {T[]} */
    const matches = [];
    const idMatches = effectiveOptions.searcher(index, term, effectiveOptions);
    idMatches.forEach((id) => {
      if (indexedDocuments[id]) matches.push(indexedDocuments[id]);
    });

    return matches;
  };

  /** @type {Search<T>["add"]} */
  const add = (documents) => {
    const { tokenizer, identifier, normalizer, fields } = effectiveOptions;

    documents.forEach((document) => {
      const id = identifier(document);
      indexedDocuments[id] = document;

      fields
        .map((path) => unwrap(document, path))
        .filter(/** @returns {value is Stringable} */ (value) =>
          !!value?.toString
        )
        .flatMap((value) => tokenizer(value.toString()))
        .map((token) => normalizer(token))
        .forEach((token) => {
          if (index[token]) index[token].add(id);
          else index[token] = new Set([id]);
        });
    });
  };

  /** @type {Search<T>["dump"]} */
  const dump = () => {
    /** @type {SearchIndexDump} */
    const dumpInit = {};

    return Object.entries(index).reduce((all, [k, v]) => {
      all[k] = Array.from(v);
      return all;
    }, dumpInit);
  };

  /** @type {Search<T>["hydrate"]} */
  const hydrate = (dump, documents) => {
    /** @type {SearchIndex} */
    const indexInit = {};

    /** @type {Record<string, T>} */
    const documentsInit = {};

    index = Object.entries(dump).reduce((all, [k, v]) => {
      all[k] = new Set(v);
      return all;
    }, indexInit);

    indexedDocuments = documents.reduce((all, i) => {
      all[effectiveOptions.identifier(i)] = i;
      return all;
    }, documentsInit);
  };

  return { search, add, dump, hydrate };
}
