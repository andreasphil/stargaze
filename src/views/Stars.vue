<template>
  <s-layout>
    <template #toolbar>
      <s-toolbar>
        <template #left>
          <s-image-icon
            v-if="viewer && viewer.avatarUrl"
            class="shrink-0"
            alt="Your GitHub avatar"
            :src="viewer.avatarUrl"
          />
          <div v-else class="shrink-0 w-10 h-10 bg-gray-100 rounded-full"></div>

          <s-input
            ref="search"
            v-model="searchString"
            icon="search"
            class="ml-3 w-full"
            placeholder="Filter..."
            title="Tip: Type anywhere to start filtering!"
            :spellcheck="false"
          >
            <template #icon>
              <search-circle-svg />
            </template>
          </s-input>
        </template>

        <template #right>
          <s-button label="Sign out" tabindex="-1" @click="signOut">
            <logout-svg />
          </s-button>
        </template>
      </s-toolbar>
    </template>

    <h1 class="mb-4 text-primary-500 text-sm font-bold uppercase">
      {{ isSearching ? `Results for "${searchString}"` : "Recently starred" }}
    </h1>

    <s-repo-list
      v-if="listed.length || loading"
      :repositories="listed"
      :busy="loading && !listed.length"
    />

    <!-- No starred repositories -->
    <s-empty-state v-if="!(isSearching || loading || listed.length)">
      <template #icon>
        <star-svg class="h-6" />
      </template>
      <template #message>You haven't starred any repositories yet.</template>
    </s-empty-state>

    <!-- No search results -->
    <s-empty-state v-if="isSearching && !(loading || listed.length)">
      <template #icon>
        <emoji-sad-svg class="h-6" />
      </template>
      <template #message>
        Nothing found when searching for "{{ searchString }}".
      </template>
    </s-empty-state>
  </s-layout>
</template>

<script>
import { defineComponent, inject } from "vue"
import EmojiSadSvg from "/@/assets/emoji-sad.svg"
import LogoutSvg from "/@/assets/logout.svg"
import SearchCircleSvg from "/@/assets/search-circle.svg"
import StarSvg from "/@/assets/star.svg"
import SButton from "/@/components/SButton.vue"
import SEmptyState from "/@/components/SEmptyState.vue"
import SImageIcon from "/@/components/SImageIcon.vue"
import SInput from "/@/components/SInput.vue"
import SLayout from "/@/components/SLayout.vue"
import SRepoList from "/@/components/SRepoList.vue"
import SToolbar from "/@/components/SToolbar.vue"
import { config as apiConfig, logout } from "/@/utils/api"
import initSearch from "/@/utils/search"

export default defineComponent({
  name: "StarsPage",

  components: {
    SRepoList,
    SButton,
    SInput,
    SToolbar,
    EmojiSadSvg,
    LogoutSvg,
    StarSvg,
    SearchCircleSvg,
    SImageIcon,
    SLayout,
    SEmptyState,
  },

  setup() {
    const toast = inject("toast", () => undefined)
    return { toast }
  },

  data() {
    return {
      searchString: "",
      search: () => new Set(),
      loading: true,
      viewer: JSON.parse(localStorage.getItem("viewer") || "{}"),
      stars: JSON.parse(localStorage.getItem("stars") || "[]"),
    }
  },

  computed: {
    /**
     * Returns whether there is an active search filter. This is considered to
     * be the case when the search string is set and not all whitespace.
     *
     * @returns {boolean} True if search is active
     */
    isSearching() {
      return this.searchString && this.searchString.trim().length
    },

    /**
     * Returns an array of starred repositories to be displayed in the UI.
     * If a search term is set, these are the search results. Otherwise it's
     * a list of the most recently starred repositories.
     *
     * @returns {Array} Filtered repositories
     */
    listed() {
      if (!this.stars?.length > 0) {
        return []
      }

      if (this.isSearching) {
        const result = this.search(this.searchString)
        return this.stars.filter((star) => result.has(star.id))
      }

      return this.stars.slice(0, Math.min(this.stars.length, 20))
    },
  },

  watch: {
    viewer: function (newValue) {
      localStorage.setItem("viewer", JSON.stringify(newValue))
    },

    stars: function (newValue) {
      localStorage.setItem("stars", JSON.stringify(newValue))
    },
  },

  async mounted() {
    // Set up search hotkey
    document.addEventListener("keyup", this.focusSearchHotkey)

    this.hydrate()
  },

  beforeUnmount() {
    // Remove search hotkey
    document.removeEventListener("keyup", this.focusSearchHotkey)
  },

  methods: {
    focusSearchHotkey(event) {
      if (this.$refs.search.focused()) {
        return
      }

      const { key, altKey } = event

      // If the event key is a single word character (0-9, a-z) and the search
      // field is not focused yet, treat the input as an input to the search
      // field
      if (key.match(/^[\w/]$/)) {
        this.searchString += key
        this.$refs.search.focus()
      } else if (key === "Backspace") {
        if (altKey) {
          this.searchString = ""
        } else {
          this.searchString = this.searchString.substring(
            0,
            Math.max(this.searchString.length - 1, 0)
          )
        }

        this.$refs.search.focus()
      }
    },

    /**
     * Clean up local user data and redirect back to the home page.
     */
    async signOut() {
      await logout()
      this.$router.push({ name: "Home" })
    },

    /**
     * Fetch viewer and stars data from the API.
     */
    async hydrate() {
      return Promise.all([
        fetch(apiConfig.viewerUrl)
          .then((response) => {
            if (!response.ok) throw response.status
            return response.json()
          })
          .then((viewer) => (this.viewer = viewer)),
        fetch(apiConfig.starsUrl)
          .then((response) => {
            if (!response.ok) throw response.status
            return response.json()
          })
          .then((stars) => (this.stars = stars)),
      ])
        .catch((e) => {
          if (e === 401) {
            this.toast(
              "Looks like your session expired. Please sign in again.",
              { type: "warning" }
            )
            this.signOut()
          } else {
            this.toast("Something went wrong while loading your data.", {
              type: "warning",
            })
          }
        })
        .finally(() => {
          this.loading = false
          this.search = initSearch(this.stars)
        })
    },
  },
})
</script>
