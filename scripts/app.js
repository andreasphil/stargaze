import { useFilteredStars, useStargazeStorage } from "@/lib.js";
import { useThemeColor } from "@andreasphil/design-system";
import { useAsyncTask } from "@andreasphil/vue-use-async-task";
import {
  computed,
  createApp,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
} from "vue";

/* -------------------------------------------------- *
 * Home                                               *
 * -------------------------------------------------- */

export const Home = defineComponent({
  setup() {
    const { username } = useStargazeStorage();
    const usernameModel = ref("");

    function browseStars() {
      username.value = usernameModel.value;
    }

    return { browseStars, usernameModel };
  },

  template: /* html */ `
    <main class="home" data-container>
      <img class="logo" src="./assets/icon-192.png" width="72" height="72" />
      <hgroup>
        <h1>Stargaze</h1>
        <p>
          A faster way of browsing and searching your starred repositories on
          GitHub.
        </p>
      </hgroup>

      <form class="usernameForm" @submit.prevent="browseStars()">
        <label for="ghUsername" data-hidden>Your GitHub username</label>
        <input
          autofocus
          id="ghUsername"
          placeholder="Your GitHub username"
          type="text"
          v-model="usernameModel"
        />
        <button class="usernameSubmit" data-variant="outline" type="submit">
          🐱 Browse stars
        </button>
      </form>

      <div class="callout">
        <div class="calloutIcon">💡</div>
        <p class="calloutText">
          This uses GitHub&rsquo;s public API and doesn&rsquo;t require you to sign
          in. Because we rely on public information, Stargaze won&rsquo;t work with
          private profiles.
        </p>
      </div>
    </main>
  `,
});

/* -------------------------------------------------- *
 * Stars list                                         *
 * -------------------------------------------------- */

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

  template: /* html */ `
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

/* -------------------------------------------------- *
 * App                                                *
 * -------------------------------------------------- */

const App = defineComponent({
  setup() {
    const { username, restoreSession } = useStargazeStorage();

    onMounted(() => {
      useThemeColor();
      restoreSession();
    });

    return { username };
  },

  components: { Home, List },

  template: /* html */ `
    <!-- Page content -->
    <Home v-if="!username" />
    <List v-else />
  `,
});

createApp(App).mount("#app");
