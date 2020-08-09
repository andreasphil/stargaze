/**
 * An inverted index mapping search terms to a set of IDs of objects matching the search term.
 *
 * @typedef {Map.<string, Set.<string>>} SearchIndex
 */

/**
 * Specifies configuration for building a search index.
 *
 * @typedef {Object} IndexingOptions
 * @property {RegExp} matcher The regular expression for splitting properties into words
 * @property {string} idProp Path to the ID property of the object (e.g. 'id' or 'node.id')
 * @property {string[]} tokenize An array containing the property names that should be indexed
 */

/**
 * A curried + memoized search function for a specific search index. This is returned by the
 * `index` function.
 *
 * @typedef {Function} SearchFn
 * @param {string} term The search term
 * @returns {Set.<string>} A set containing the result IDs
 */

/**
 * Returns the intersection of multiple sets.
 *
 * @param {...Set} sets Sets to get common elements from
 * @returns {Set} Set containing the elements shared among the source sets
 */
function intersect(...sets) {
  const setsCopy = [...sets]

  if (!setsCopy?.length) {
    return new Set()
  } else if (setsCopy.length === 1) {
    return setsCopy[0]
  }

  const a = setsCopy.shift()
  const b = setsCopy.shift()
  const intersection = new Set()

  a.forEach(itemFromA => {
    if (b.has(itemFromA)) {
      intersection.add(itemFromA)
    }
  })

  setsCopy.unshift(intersection)

  return intersect(...setsCopy)
}

/**
 * Recursively reads the value of a property from nested object structures. For example:
 *
 * getNestedProp({ a: { b: 'value' }}, 'a.b') // => 'value'
 *
 * @param {Object} obj Object to get the value from
 * @param {string} prop Path to the property inside the object (property names separated by '.')
 * @returns {*} The property value. Can be undefined if the specified property doesn't exist
 */
function getNestedProp(obj, prop) {
  if (!obj) {
    return undefined
  }

  const dotIndex = prop.indexOf('.')
  if (dotIndex >= 0) {
    const current = prop.substring(0, dotIndex)
    const remaining = prop.substring(dotIndex + 1, prop.length)

    return getNestedProp(obj[current], remaining)
  } else {
    return obj[prop]
  }
}

/**
 * Looks up all ID entries in the index for a search term. The search term is split according to
 * the provided matcher expression. If the term consists of multiple words, only results containing
 * all words are returned.
 *
 * @param {Map} index Search index to get the results from
 * @param {string} term Search term to look up
 * @param {RegExp} matcher The expression used to split the term into multiple words
 * @returns {Set.<string>} A set containing the IDs associated with the search term
 */
function search(index, term, matcher = /\w+/g) {
  const results = term
    .toLowerCase()
    .match(matcher)
    .filter(term => index.has(term))
    .map(term => index.get(term))

  return intersect(...results)
}

/**
 * Curries + memoizes the search function for a specific search index, using a pre-defined
 * matcher. The resulting function takes a search term as a parameter and returns the results
 * from the index.
 *
 * @param {SearchIndex} index Search index to use
 * @param {RegExp} matcher Matcher to use
 * @returns {SearchFn} Search function
 */
function initializeSearch(index, matcher) {
  const memo = new Map()

  const searchFn = term => {
    if (memo.has(term)) {
      // Return the cached result if the term has been searched for before
      return memo.get(term)
    }

    // Perform a new search and cache the result
    const results = search(index, term, matcher)
    memo.set(term, results)

    return results
  }

  return searchFn
}

/**
 * Adds the specified data to an existing search index.
 *
 * @param {SearchIndex} index Existing index
 * @param {Object[]} data New data to add
 * @param {*} options Indexing options
 * @returns {Map} Combined search index containing the old and new data
 */
function addToIndex(index, data, options) {
  // Indexing works like this: First, all properties of the object that should be searchable are
  // combined into a single string to make them easier to process. Since the search algorithm is
  // designed to only return a set of IDs as search results, we don't need to remember the exact
  // property responsible for the macht. Next, the string is converted to lower case, just like
  // the search term will be, in order to make searching case-insensitive. The result is split into
  // individual tokens. Each token is added as a key to a map, the value being the IDs of all
  // objects containing the token.

  return data.reduce((all, current) => {
    options.tokenize
      .map(prop => getNestedProp(current, prop))
      .join(' ')
      .toLowerCase()
      .match(options.matcher)
      .forEach(token => {
        if (!all.has(token)) {
          all.set(token, new Set())
        }

        const id = getNestedProp(current, options.idProp)
        all.get(token).add(id)
      })

    return all
  }, new Map(index))
}

/**
 * Generates an inverted index from a set of data to make it searchable. The function returns
 * another function that takes a search term as a parameter and returns a set containing the IDs
 * of the objects from the data set that match the search term.
 *
 * As of now, the search algorithm has the following limitations:
 *  - Search is case-insensitive
 *  - It's string-based, so non-string values will be converted
 *  - Results only contain matches for full words (e.g. 'hello' will match 'hello', but not 'hel')
 *
 * TODO: Implement support for partial matches
 *
 * @param {Object[]} data The data set that should be indexed
 * @param {IndexingOptions} options Settings for indexing
 * @returns {SearchFn} A function that can be used to search the data set for specific terms
 */
export default function index(data, options = {}) {
  /** @type {IndexingOptions} */
  const defaultOpts = {
    matcher: /\w+/g,
    idProp: 'id',
    tokenize: []
  }

  const opts = { ...defaultOpts, ...options }

  const searchIndex = addToIndex(new Map(), data || [], opts)
  return initializeSearch(searchIndex, opts.matcher)
}
