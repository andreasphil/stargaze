import createSearch, {
  startsWith,
} from "@vendor/andreasphil/js-inverted-index@v1.8.0/dist/invertedIndex.js";
import { computed, ref, watch } from "vue";

// Utils --------------------------------------------------

/**
 * @param {TemplateStringsArray} strings
 * @param {unknown[]} values
 * @returns {string}
 */
const tag = (strings, ...values) => String.raw({ raw: strings }, ...values);

/**
 * Helper for HTML template strings. The tag does nothing, but using it will
 * allow syntax highlighting and formatting if your editor supports it.
 */
export const html = tag;

function isDev() {
  return window.location.hostname === "localhost";
}

// Data fetching and storage ------------------------------

/**
 * @typedef {Object} StarredRepository
 * @prop {string} id
 * @prop {string} description
 * @prop {string} full_name
 * @prop {string} html_url
 * @prop {string} language
 * @prop {string} name
 * @prop {string|undefined} homepage
 * @prop {string[]} topics
 * @prop {Object} owner
 * @prop {string} owner.avatar_url
 * @prop {string} owner.html_url
 */

export function createStargazeStorage() {
  // User ---------------------------------------------------

  const username = ref("");

  watch(username, (value) =>
    value
      ? localStorage.setItem("username", value)
      : localStorage.removeItem("username")
  );

  const avatarUrl = computed(() => `https://github.com/${username.value}.png`);

  // Starred repositories -----------------------------------

  const starredRepositories = ref([]);

  watch(starredRepositories, (value) => {
    value && value.length
      ? localStorage.setItem("starred", JSON.stringify(value))
      : localStorage.removeItem("starred");
  });

  async function fetchStarredRepositories() {
    if (!username.value) return;

    if (isDev() && starredRepositories.value?.length > 0) {
      console.warn(
        "During development we only fetch stars if no data exists locally in order to avoid getting rate limited by GitHub. Delete `starred` from localStorage and reload the page to fetch new data."
      );
      return;
    }

    let done = false;
    let results = [];
    let pageSize = 100;
    let page = 1;

    while (!done) {
      const response = await fetch(
        `https://api.github.com/users/${username.value}/starred?per_page=${pageSize}&page=${page}`
      );

      if (!response.ok) throw new Error();
      const data = await response.json();
      done = !data || data.length < pageSize;
      if (data?.length) results.push(...data);
      page += 1;
    }

    starredRepositories.value = results;
  }

  // Session management -------------------------------------

  function restoreSession() {
    username.value = localStorage.getItem("username") ?? "";

    try {
      const raw = localStorage.getItem("starred");
      if (raw) {
        const starred = JSON.parse(raw);
        starredRepositories.value = starred;
      }
    } catch {}
  }

  function signOut() {
    username.value = "";
    starredRepositories.value = [];
  }

  return function useStargazeStorage() {
    return {
      avatarUrl,
      fetchStarredRepositories,
      restoreSession,
      signOut,
      starredRepositories,
      username,
    };
  };
}

export const useStargazeStorage = createStargazeStorage();

// Search -------------------------------------------------

export function useFilteredStars(searchTerm) {
  const { starredRepositories } = useStargazeStorage();

  const searchFn = ref(() => []);

  watch(
    starredRepositories,
    (vals) => {
      const { search, add } = createSearch({
        fields: ["description", "full_name", "language", "homepage", "topics"],
        tokenizer: startsWith,
      });

      add(vals);

      searchFn.value = search;
    },
    { immediate: true }
  );

  const results = computed(() =>
    searchTerm.value
      ? searchFn.value(searchTerm.value)
      : starredRepositories.value
  );

  return results;
}
