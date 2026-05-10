import { useAsyncTask } from "@common/vue-use-async-task.js";
import { computed, createApp, defineComponent, onMounted, onUnmounted, ref, watch } from "vue";
import { html, useFilteredStars, useStargazeStorage } from "@/lib.js";

// Home ---------------------------------------------------

export const Home = defineComponent({
  setup() {
    const { username } = useStargazeStorage();
    const usernameModel = ref("");

    function browseStars() {
      username.value = usernameModel.value;
    }

    return { browseStars, usernameModel };
  },

  template: html`<main class="trim">
    <hgroup class="text-center margin-y-body">
      <img
        class="rounded-squircle shadow-high"
        src="./assets/icon-192.png"
        width="72"
        height="72"
      />
      <h1>Stargaze</h1>
      <p>A faster way of browsing and searching your starred repositories on GitHub.</p>
    </hgroup>

    <form class="username-form" @submit.prevent="browseStars()">
      <label for="ghUsername" class="visually-hidden">Your GitHub username</label>
      <input
        autofocus
        class="surface"
        id="ghUsername"
        placeholder="Your GitHub username"
        type="text"
        v-model="usernameModel"
      />
      <button class="username-submit" variant="haptic" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-star-icon lucide-star"
        >
          <path
            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
          />
        </svg>
        Browse stars
      </button>
    </form>

    <div class="callout">
      <div class="color-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-lightbulb-icon lucide-lightbulb"
        >
          <path
            d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
          />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
      </div>

      <p class="color-variant font-size-small no-margin">
        This uses GitHub&rsquo;s public API and doesn&rsquo;t require you to sign in. Because we
        rely on public information, Stargaze won&rsquo;t work with private profiles.
      </p>
    </div>
  </main>`,
});

// Stars list ---------------------------------------------

export const List = defineComponent({
  setup() {
    // API data -----------------------------------------------

    const { avatarUrl, fetchStarredRepositories: load, signOut } = useStargazeStorage();

    const { run: runLoad, isLoading, hasError } = useAsyncTask(load);

    onMounted(async () => {
      await runLoad();
    });

    const fallbackState = computed(() => {
      if (hasError.value) {
        return "error";
      } else if (!starredRepositories.value.length) {
        if (isLoading.value) return "loading";
        else return "empty";
      } else {
        return true;
      }
    });

    // Searching ----------------------------------------------

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

    const firstResultLink = computed(() => starredRepositories.value[0]?.html_url);

    function jumpToFirstResult(targetBlank) {
      if (!firstResultLink.value) return;
      window.open(firstResultLink.value, targetBlank ? "_blank" : "_self");
    }

    // Website links ------------------------------------------

    const preferWebsite = ref(localStorage.getItem("prefer-website") === "true");

    watch(preferWebsite, (is) => {
      localStorage.setItem("prefer-website", is.toString());
    });

    // Component scope ----------------------------------------

    return {
      avatarUrl,
      fallbackState,
      hasError,
      inputEl,
      isLoading,
      jumpToFirstResult,
      preferWebsite,
      searchTerm,
      signOut,
      starredRepositories,
    };
  },

  template: html`<header>
      <nav fixed class="header">
        <strong>
          <img
            src="./assets/icon-192.png"
            class="rounded-squircle shadow-high"
            width="36"
            height="36"
            alt=""
          />Stargaze
        </strong>

        <input
          @keydown.enter.stop="jumpToFirstResult($event.metaKey)"
          aria-label="Search"
          autocorrect="off"
          class="search-input"
          placeholder="Search..."
          ref="inputEl"
          spellcheck="false"
          type="search"
          v-model="searchTerm"
        />

        <button @click="signOut()" class="sign-out-btn" variant="muted" type="button">
          <img :src="avatarUrl" alt="" class="avatar" />
          Leave
        </button>
      </nav>
    </header>

    <!-- Stars list -->
    <main :has-fallback="fallbackState">
      <div>
        <template v-if="starredRepositories?.length">
          <div class="stars-header">
            <small class="color-primary font-weight-medium" :aria-busy="isLoading">
              {{ starredRepositories.length }} items
            </small>
            <label>
              <input role="switch" type="checkbox" v-model="preferWebsite" />
              Prefer website
            </label>
          </div>

          <ul class="stars">
            <li v-for="(s, i) in starredRepositories" :key="s.id" class="star">
              <a
                :href="preferWebsite && s.homepage ? s.homepage : s.html_url"
                :ref="(el) => i === 0 && (firstResult = el)"
                :title="s.full_name"
                class="card"
              >
                <header>
                  <img :src="s.owner.avatar_url" alt="" loading="lazy" />
                </header>
                <p class="clamp">@{{ s.full_name }}</p>
                <p v-if="s.description" class="clamp" style="--clamp: 2;">{{ s.description }}</p>
              </a>
            </li>
          </ul>
        </template>
      </div>

      <div fallback-for="empty">
        <p>🫣</p>
        <p>Nothing to see here.</p>
      </div>

      <div fallback-for="loading">
        <div aria-busy="true"></div>
        <p>Loading...</p>
      </div>

      <div fallback-for="error">
        <p>😵</p>
        <p>Failed to load your stars from GitHub.</p>
      </div>
    </main>`,
});

// App ----------------------------------------------------

const App = defineComponent({
  setup() {
    const { username, restoreSession } = useStargazeStorage();

    onMounted(() => {
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
