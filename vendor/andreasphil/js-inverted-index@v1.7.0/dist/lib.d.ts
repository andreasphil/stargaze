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
export function unwrap(obj: Record<string, any>, prop: PropPath): Stringable | undefined;
/**
 * Returns the intersection of multiple sets.
 *
 * @template T
 * @param {Set<T>[]} sets Sets to get common elements from
 * @returns {Set<T>} Set containing the elements shared among the source sets
 */
export function intersect<T>(...sets: Set<T>[]): Set<T>;
/**
 * Identifies documents by the value of a property.
 *
 * @template {Record<string, any>} T
 * @param {keyof T} prop
 * @returns {IdentifierFn<T>}
 */
export function idProp<T extends Record<string, any>>(prop: keyof T): IdentifierFn<T>;
/**
 * Returns a new tokenizer that splits a value based on the specified regex.
 *
 * @param {RegExp} exp
 * @returns {TokenizerFn}
 */
export function regexSplit(exp: RegExp): TokenizerFn;
/**
 * Creates a new search index and returns functions for interacting with it.
 *
 * @template {Searchable} T
 * @param {Partial<IndexingOptions>} [options={}]
 * @returns {Search<T>}
 */
export default function createSearch<T extends Searchable>(options?: Partial<IndexingOptions>): Search<T>;
/**
 * Removes leading/trailing whitespace and converts the value to lowercase.
 * @type {NormalizerFn}
 */
export const lowercaseTrim: NormalizerFn;
/**
 * Looks up all ID entries in the index for a search term. The search term is
 * split according to the provided matcher expression. If the term consists of
 * multiple words, only results containing all words are returned.
 *
 * @type {SearcherFn}
 */
export const matchAllTerms: SearcherFn;
export function fullWordSplit(input: string): string[];
/**
 * Returns a tokenizer that returns the word itself as well as anything that
 * that would return true if used with `startsWith`, e.g. for dog, return d,
 * do, and dog.
 *
 * @type {TokenizerFn}
 */
export const startsWith: TokenizerFn;
/**
 * Specifies a nested property inside an object.
 */
export type PropPath = string | string[];
/**
 * Strings or stuff that can be converted into a string.
 */
export type Stringable = string | {
    toString: () => string;
};
/**
 * Documents that can be added to the search index.
 */
export type Searchable = Record<string, unknown>;
/**
 * Mapping of search terms to the IDs of matching documents.
 */
export type SearchIndex = Record<string, Set<string>>;
/**
 * Search index with an ID array instead of a set (for JSON serialization).
 */
export type SearchIndexDump = Record<string, string[]>;
/**
 * Takes a document and returns a value that can be used for uniquely
 * identifying the document.
 */
export type IdentifierFn<T extends Searchable = any, U = string> = (document: T) => U;
/**
 * Takes a string and splits it into individual tokens. These tokens will be
 * used for building the search index.
 */
export type TokenizerFn = (input: string) => string[];
/**
 * Takes a string and returns it in a normalized format, e.g. converts it to
 * lowercase and trim leading/trailing whitespace.
 */
export type NormalizerFn = (input: string) => string;
/**
 * Takes and index and returns all search results for the specified term. Calls
 * to the function will also use the original indexing options. These can be
 * used for normalizing and tokenizing the search term in the same way the
 * documents in the index are in order to make matches more likely.
 */
export type SearcherFn = (index: SearchIndex, term: string, options: IndexingOptions) => Set<string>;
/**
 * Specifies configuration for building a search index.
 */
export type IndexingOptions = {
    /**
     * Strategy for extracting an ID from a document.
     */
    identifier: IdentifierFn;
    /**
     * Strategy for splitting a value of a document into tokens.
     */
    tokenizer: TokenizerFn;
    /**
     * Strategy for normalizing the format of the tokens.
     */
    normalizer: NormalizerFn;
    /**
     * Strategy for looking up terms in the index.
     */
    searcher: SearcherFn;
    /**
     * An array containing the properties that should be indexed.
     */
    fields: PropPath[];
};
/**
 * The closure returned when the search has been initialized. Contains methods
 * for interacting with the index, such as adding documents or searching.
 */
export type Search<T extends Searchable> = {
    search: (term: string) => T[];
    add: (documents: T[]) => void;
    dump: () => SearchIndexDump;
    hydrate: (index: SearchIndexDump, documents: T[]) => void;
};
