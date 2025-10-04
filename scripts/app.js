import { html, useFilteredStars, useStargazeStorage } from "@/lib.js";
import { useAsyncTask } from "@vendor/vue-use-async-task.js";
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
      <p>
        A faster way of browsing and searching your starred repositories on
        GitHub.
      </p>
    </hgroup>

    <form class="username-form" @submit.prevent="browseStars()">
      <label for="ghUsername" class="visually-hidden"
        >Your GitHub username</label
      >
      <input
        autofocus
        id="ghUsername"
        placeholder="Your GitHub username"
        type="text"
        v-model="usernameModel"
      />
      <button class="username-submit" variant="secondary" type="submit">
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

// Stars list ---------------------------------------------

export const List = defineComponent({
  setup() {
    // API data -----------------------------------------------

    const {
      avatarUrl,
      fetchStarredRepositories: load,
      signOut,
    } = useStargazeStorage();

    const { run: runLoad, isLoading, hasError } = useAsyncTask(load);

    onMounted(async () => {
      notificationEl.value?.showPopover();
      const [, error] = await runLoad();
      if (!error) {
        notificationEl.value?.hidePopover();
      }
    });

    const notificationEl = useTemplateRef("notificationEl");

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

    const firstResultLink = computed(
      () => starredRepositories.value[0]?.html_url
    );

    function jumpToFirstResult(targetBlank) {
      if (!firstResultLink.value) return;
      window.open(firstResultLink.value, targetBlank ? "_blank" : "_self");
    }

    // Website links ------------------------------------------

    const preferWebsite = ref(
      localStorage.getItem("prefer-website") === "true"
    );

    watch(preferWebsite, (is) => {
      localStorage.setItem("prefer-website", is.toString());
    });

    // Component scope ----------------------------------------

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
          class="search-input"
          placeholder="Search..."
          ref="inputEl"
          type="search"
          v-model="searchTerm"
        />

        <button
          @click="signOut()"
          class="sign-out-btn"
          variant="muted"
          type="button"
        >
          <img :src="avatarUrl" alt="" class="avatar" />
          Leave
        </button>
      </nav>
    </header>

    <!-- Stars list -->
    <main has-fallback>
      <div>
        <template v-if="starredRepositories?.length">
          <div class="stars-header">
            <small class="color-primary font-weight-medium">
              {{ starredRepositories.length }} items
            </small>
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
                class="card"
              >
                <header>
                  <img :src="s.owner.avatar_url" alt="" loading="lazy" />
                </header>
                <p class="clamp">@{{ s.full_name }}</p>
                <p v-if="s.description" class="clamp" style="--clamp: 2;">
                  {{ s.description }}
                </p>
              </a>
            </li>
          </ul>
        </template>
      </div>

      <!-- Empty state -->
      <div fallback-for="empty">
        <p>🫣</p>
        <p>Nothing to see here.</p>
      </div>
    </main>

    <div
      :aria-busy="isLoading"
      class="notification"
      popover="manual"
      ref="notificationEl"
    >
      <template v-if="!hasError">Fetching your stuff ...</template>
      <template v-else>🚨 Couldn&rsquo;t fetch your stars!</template>
    </div>`,
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
