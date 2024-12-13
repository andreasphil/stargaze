import { html, useFilteredStars, useStargazeStorage } from "@/lib.js";
import { useThemeColor } from "@vendor/andreasphil/design-system@v0.39.0/scripts/utils.js";
import { useAsyncTask } from "@vendor/andreasphil/vue-use-async-task@v0.5.0/dist/lib.js";
import {
  computed,
  createApp,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  useTemplateRef,
  watch,
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

  template: html`<main>
    <hgroup class="home">
      <img class="logo" src="./assets/icon-192.png" width="72" height="72" />
      <h1>Stargaze</h1>
      <p>
        A faster way of browsing and searching your starred repositories on
        GitHub.
      </p>
    </hgroup>

    <form class="username-form" @submit.prevent="browseStars()">
      <label for="ghUsername" data-hidden>Your GitHub username</label>
      <input
        autofocus
        id="ghUsername"
        placeholder="Your GitHub username"
        type="text"
        v-model="usernameModel"
      />
      <button class="username-submit" data-variant="outline" type="submit">
        🐱 Browse stars
      </button>
    </form>

    <div class="callout">
      <div class="calloutIcon">💡</div>
      <p class="callout-text">
        This uses GitHub&rsquo;s public API and doesn&rsquo;t require you to
        sign in. Because we rely on public information, Stargaze won&rsquo;t
        work with private profiles.
      </p>
    </div>
  </main>`,
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
     * Website links                                      *
     * -------------------------------------------------- */

    const preferWebsite = ref(localStorage.getItem("prefer-website") === "true");

    watch(preferWebsite, (is) => {
      localStorage.setItem("prefer-website", is.toString());
    });

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
      preferWebsite,
    };
  },

  template: html`<header>
      <nav data-variant="fixed" class="header">
        <strong>
          <img
            src="./assets/icon-192.png"
            class="logo"
            width="36"
            height="36"
            alt=""
          />Stargaze
        </strong>

        <input
          @keydown.enter.stop="jumpToFirstResult($event.metaKey)"
          aria-label="Search"
          class="search-input"
          placeholder="Search..."
          ref="inputEl"
          type="search"
          v-model="searchTerm"
        />

        <button
          @click="signOut()"
          class="sign-out-btn"
          data-variant="muted"
          type="button"
        >
          <img :src="avatarUrl" alt="" class="avatar" />
          Leave
        </button>
      </nav>
    </header>

    <!-- Stars list -->
    <main data-with-fallback>
      <div>
        <template v-if="starredRepositories?.length">
          <div class="stars-header">
            <span>{{ starredRepositories.length }} items</span>
            <label
              ><input
                role="switch"
                type="checkbox"
                v-model="preferWebsite"
              />Prefer website</label
            >
          </div>

          <ul class="stars">
            <li v-for="(s, i) in starredRepositories" :key="s.id" class="star">
              <a
                :href="preferWebsite && s.homepage ? s.homepage : s.html_url"
                :ref="(el) => i === 0 && (firstResult = el)"
                :title="s.full_name"
              >
                <img
                  :src="s.owner.avatar_url"
                  alt=""
                  class="star-icon"
                  loading="lazy"
                />
                <strong class="star-title" data-clamp="1">
                  @{{ s.full_name }}
                </strong>
                <small
                  v-if="s.description"
                  class="star-description"
                  data-clamp="2"
                >
                  {{ s.description }}
                </small>
              </a>
            </li>
          </ul>
        </template>
      </div>

      <!-- Empty state -->
      <div data-when="empty">
        <p>🫣</p>
        <p>Nothing to see here.</p>
      </div>
    </main>

    <!-- Status notification -->
    <div class="status-layout">
      <Transition name="slide">
        <div
          v-if="isLoading || hasError"
          aria-busy="true"
          class="status"
          data-color-scheme="inverted"
        >
          <small class="status-label">
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

  template: html`
    <!-- Page content -->
    <Home v-if="!username" />
    <List v-else />
  `,
});

createApp(App).mount("#app");
