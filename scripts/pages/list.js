import { useStargazeStorage } from "@/data.js";
import { useFilteredStars } from "@/search.js";
import { useAsyncTask } from "@andreasphil/vue-use-async-task";
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";

export const List = defineComponent({
  setup() {
    /* -------------------------------------------------- *
     * API data                                           *
     * -------------------------------------------------- */

    const {
      avatarUrl,
      fetchStarredRepositories: load,
      signOut,
    } = useStargazeStorage();

    const { run: runLoad, isLoading, hasError } = useAsyncTask(load);

    onMounted(() => runLoad());

    /* -------------------------------------------------- *
     * Searching                                          *
     * -------------------------------------------------- */

    const searchTerm = ref("");
    const inputEl = ref();

    function onSearchHotkey(event) {
      if (event.key === "/" && inputEl.value) {
        event.preventDefault();
        inputEl.value.focus();
      }
    }

    onMounted(() => addEventListener("keydown", onSearchHotkey));
    onUnmounted(() => removeEventListener("keydown", onSearchHotkey));

    const starredRepositories = useFilteredStars(searchTerm);

    const firstResultLink = computed(
      () => starredRepositories.value[0]?.html_url
    );

    function jumpToFirstResult(targetBlank) {
      if (!firstResultLink.value) return;
      window.open(firstResultLink.value, targetBlank ? "_blank" : "_self");
    }

    /* -------------------------------------------------- *
     * Component scope                                    *
     * -------------------------------------------------- */

    return {
      avatarUrl,
      hasError,
      inputEl,
      isLoading,
      jumpToFirstResult,
      searchTerm,
      signOut,
      starredRepositories,
    };
  },

  template: `
    <div data-nav="fixed">
      <header>
        <nav data-variant="fixed" class="header">
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            alt=""
            class="avatar"
            height="48"
            width="48"
          />

          <input
            @keydown.enter.stop="jumpToFirstResult($event.metaKey)"
            aria-label="Search"
            class="searchInput"
            placeholder="Search ..."
            ref="inputEl"
            type="search"
            v-model="searchTerm"
          />

          <button
            @click="signOut()"
            class="signOutBtn"
            data-variant="muted"
            type="button"
          >
            👋 Leave
          </button>
        </nav>
      </header>

      <!-- Stars list -->
      <main data-with-fallback>
        <div>
          <ul v-if="starredRepositories?.length" class="starsList">
            <li
              v-for="(s, i) in starredRepositories"
              :key="s.id"
              class="starsListItem"
            >
              <a
                :href="s.html_url"
                :ref="(el) => i === 0 && (firstResult = el)"
                class="star"
              >
                <img
                  :src="s.owner.avatar_url"
                  alt=""
                  class="starIcon"
                  height="56"
                  loading="lazy"
                  width="56"
                />
                <span>
                  <strong class="starName">@{{ s.full_name }}</strong>
                  <small class="starDescription">{{
                    s.description
                  }}</small>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Empty state -->
        <div data-when="empty">
          <p>😵‍💫</p>
          <p>Sorry, couldn&rsquo;t find anything.</p>
        </div>
      </main>

      <!-- Status notification -->
      <div class="statusLayout">
        <Transition name="slide">
          <div
            v-if="isLoading || hasError"
            :aria-busy="isLoading"
            class="status"
          >
            <small class="statusLabel">
              <template v-if="!hasError">Fetching your stuff ...</template>
              <template v-else>🚨 Couldn&rsquo;t fetch your stars!</template>
            </small>
          </div>
        </Transition>
      </div>
    </div>`,
});
