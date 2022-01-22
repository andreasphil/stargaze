<template>
  <SLayout>
    <template #toolbar>
      <SToolbar>
        <template #left>
          <SImageIcon
            v-if="viewer && viewer.avatarUrl"
            class="shrink-0"
            alt="Your GitHub avatar"
            :src="viewer.avatarUrl"
          />
          <div v-else class="shrink-0 w-10 h-10 bg-gray-100 rounded-full"></div>

          <SInput
            ref="searchEl"
            v-model="searchString"
            icon="search"
            class="ml-3 w-full"
            placeholder="Filter..."
            title="Tip: Type anywhere to start filtering!"
            :spellcheck="false"
          >
            <template #icon>
              <SearchCircleSvg />
            </template>
          </SInput>
        </template>

        <template #right>
          <SButton label="Sign out" tabindex="-1" @click="signOut">
            <LogoutSvg />
          </SButton>
        </template>
      </SToolbar>
    </template>

    <h1
      class="mb-4 text-primary-500 text-sm font-bold uppercase flex items-center h-6 gap-2"
    >
      {{ isSearching ? `Results for "${searchString}"` : "Recently starred" }}
      <span
        v-if="loading"
        class="inline-flex items-center text-xs uppercase font-bold bg-primary-100 pl-1 pr-2 py-1 rounded-full shadow-md text-white bg-gradient-to-br from-gray-700 to-gray-900"
      >
        <span
          class="border-2 border-gray-600 border-t-gray-100 rounded-full w-4 h-4 inline-block mr-2 animate-spin"
        ></span>
        Updating ...</span
      >
    </h1>

    <SRepoList
      v-if="listed.length || loading"
      :repositories="listed"
      :busy="loading && !listed.length"
    />

    <!-- No starred repositories -->
    <SEmptyState v-if="!(isSearching || loading || listed.length)">
      <template #icon>
        <StarSvg class="h-6" />
      </template>
      <template #message>You haven't starred any repositories yet.</template>
    </SEmptyState>

    <!-- No search results -->
    <SEmptyState v-if="isSearching && !(loading || listed.length)">
      <template #icon>
        <EmojiSadSvg class="h-6" />
      </template>
      <template #message>
        Nothing found when searching for "{{ searchString }}".
      </template>
    </SEmptyState>
  </SLayout>
</template>

<script setup lang="ts">
import {
  ComponentPublicInstance,
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { Repository, ToasterProvider } from "../utils/types";
import EmojiSadSvg from "/@/assets/emoji-sad.svg?component";
import LogoutSvg from "/@/assets/logout.svg?component";
import SearchCircleSvg from "/@/assets/search-circle.svg?component";
import StarSvg from "/@/assets/star.svg?component";
import SButton from "/@/components/SButton.vue";
import SEmptyState from "/@/components/SEmptyState.vue";
import SImageIcon from "/@/components/SImageIcon.vue";
import SInput from "/@/components/SInput.vue";
import SLayout from "/@/components/SLayout.vue";
import SRepoList from "/@/components/SRepoList.vue";
import SToolbar from "/@/components/SToolbar.vue";
import { config as apiConfig, logout } from "/@/utils/api";
import initSearch from "/@/utils/search";

/* -------------------------------------------------- *
 * General page stuff                                 *
 * -------------------------------------------------- */

const toast = inject(ToasterProvider, () => undefined);
const router = useRouter();
const loading = ref(false);

async function signOut() {
  await logout();
  router.push({ name: "Home" });
}

/* -------------------------------------------------- *
 * Search                                             *
 * -------------------------------------------------- */

const searchEl = ref<ComponentPublicInstance<typeof SInput>>();
const searchString = ref("");

// This will be replaced by the search function once we have it populated
let searchFn = ref<(value: string) => Set<String>>(() => new Set());

const isSearching = computed(
  () => searchString.value && searchString.value.trim().length
);

const focusSearchHotkey = (event: KeyboardEvent) => {
  if (!searchEl.value || searchEl.value.focused()) {
    return;
  }

  const { key, altKey } = event;

  // If the event key is a single word character (0-9, a-z) and the search
  // field is not focused yet, treat the input as an input to the search
  // field
  if (key.match(/^[\w/]$/)) {
    searchString.value += key;
    searchEl.value.focus();
  } else if (key === "Backspace") {
    if (altKey) {
      searchString.value = "";
    } else {
      searchString.value = searchString.value.substring(
        0,
        Math.max(searchString.value.length - 1, 0)
      );
    }

    searchEl.value.focus();
  }
};

onMounted(() => document.addEventListener("keyup", focusSearchHotkey));
onBeforeUnmount(() => document.removeEventListener("keyup", focusSearchHotkey));

/* -------------------------------------------------- *
 * View content                                       *
 * -------------------------------------------------- */

const viewer = ref(JSON.parse(localStorage.getItem("viewer") || "{}"));
watch(viewer, (newValue) => {
  localStorage.setItem("viewer", JSON.stringify(newValue));
});

const stars = ref<Repository[]>(
  JSON.parse(localStorage.getItem("stars") || "[]")
);
watch(stars, (newValue) => {
  localStorage.setItem("stars", JSON.stringify(newValue));
});

/**
 * Returns an array of starred repositories to be displayed in the UI.
 * If a search term is set, these are the search results. Otherwise it's
 * a list of the most recently starred repositories.
 */
const listed = computed(() => {
  if (isSearching.value) {
    const result = searchFn.value(searchString.value);
    return stars.value.filter((star) => result.has(star.id));
  }

  return stars.value.slice(0, Math.min(stars.value.length, 20));
});

/**
 * Fetch viewer and stars data from the API.
 */
async function hydrate() {
  loading.value = true;

  return Promise.all([
    fetch(apiConfig.viewerUrl)
      .then((response) => {
        if (!response.ok) throw response.status;
        return response.json();
      })
      .then((result) => (viewer.value = result)),
    fetch(apiConfig.starsUrl)
      .then((response) => {
        if (!response.ok) throw response.status;
        return response.json();
      })
      .then((result) => (stars.value = result)),
  ])
    .catch((e) => {
      if (e === 401) {
        toast("Looks like your session expired. Please sign in again.", {
          type: "warning",
        });
        signOut();
      } else {
        toast("Something went wrong while loading your data.", {
          type: "warning",
        });
      }
    })
    .finally(() => {
      loading.value = false;
      searchFn.value = initSearch(stars.value);
    });
}
onMounted(() => hydrate());
</script>
