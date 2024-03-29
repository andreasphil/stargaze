import { computed, ref, watch } from "vue";

function isDev() {
  return window.location.hostname === "localhost";
}

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
  /* -------------------------------------------------- *
   * User                                               *
   * -------------------------------------------------- */

  const username = ref("");
  watch(username, (value) =>
    value
      ? localStorage.setItem("username", value)
      : localStorage.removeItem("username")
  );

  const avatarUrl = computed(() => `https://github.com/${username.value}.png`);

  /* -------------------------------------------------- *
   * Starred repositories                               *
   * -------------------------------------------------- */

  const starredRepositories = ref([]);

  watch(starredRepositories, (value) => {
    value && value.length
      ? localStorage.setItem("starred", JSON.stringify(value))
      : localStorage.removeItem("starred");
  });

  const hasError = ref(false);
  const isLoading = ref(false);

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
    hasError.value = false;
    isLoading.value = true;

    try {
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
    } catch {
      hasError.value = true;
    } finally {
      isLoading.value = false;
    }

    starredRepositories.value = results;
  }

  /* -------------------------------------------------- *
   * Session management                                 *
   * -------------------------------------------------- */

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
      username,
      avatarUrl,

      fetchStarredRepositories,
      hasError,
      isLoading,
      starredRepositories,

      restoreSession,
      signOut,
    };
  };
}

export const useStargazeStorage = createStargazeStorage();
