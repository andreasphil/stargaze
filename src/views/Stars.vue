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
let searchFn = ref<(value: string) => Set<Repository>>(() => new Set());

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
const listed = computed(() =>
  isSearching.value
    ? Array.from(searchFn.value(searchString.value))
    : stars.value
);

/** Fetch viewer and stars data from the API */
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

<template>
  <SLayout class="pt-20">
    <template #toolbar>
      <SToolbar>
        <template #left>
          <SImageIcon
            v-if="viewer && viewer.avatarUrl"
            :src="viewer.avatarUrl"
            alt="Your GitHub avatar"
            class="shrink-0"
            height="40"
            width="40"
          />
          <div v-else class="shrink-0 w-10 h-10 bg-gray-100 rounded-full"></div>
          <SInput
            v-model="searchString"
            :spellcheck="false"
            class="ml-3"
            icon="search"
            placeholder="Filter..."
            ref="searchEl"
            title="Tip: Type anywhere to start filtering!"
          >
            <template #icon>
              <SearchCircleSvg />
            </template>
          </SInput>
        </template>
        <template #right>
          <span
            v-if="loading && listed.length > 0"
            aria-busy="true"
            class="text-$c-primary"
          ></span>
          <SButton
            @click="signOut"
            class="w-auto text-$c-fg -mr-4 ml-2"
            data-fine-button="ghost"
            label="Sign out"
            tabindex="-1"
          >
            <LogoutSvg />
          </SButton>
        </template>
      </SToolbar>
    </template>

    <div
      v-if="loading && listed.length === 0"
      class="text-center text-$c-primary"
    >
      <span aria-busy="true"></span>
    </div>

    <SRepoList v-else-if="listed.length > 0" :repositories="listed" />

    <!-- No starred repositories -->
    <SEmptyState v-else-if="!isSearching && listed.length === 0">
      <template #icon>
        <StarSvg class="h-6" />
      </template>
      <template #message>You haven't starred any repositories yet.</template>
    </SEmptyState>

    <!-- No search results -->
    <SEmptyState v-else-if="isSearching && listed.length === 0">
      <template #icon>
        <EmojiSadSvg class="h-6" />
      </template>
      <template #message>
        Nothing found when searching for "{{ searchString }}".
      </template>
    </SEmptyState>
  </SLayout>
</template>
