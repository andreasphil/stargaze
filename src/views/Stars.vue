<template>
  <s-layout>
    <template #toolbar>
      <s-toolbar>
        <template #left>
          <s-image-icon
            v-if="viewer && viewer.avatarUrl"
            class="flex-shrink-0"
            alt="Your GitHub avatar"
            :src="viewer.avatarUrl"
          />
          <div
            v-else
            class="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full"
          ></div>

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

    <!-- Always keep the full list in the background so the browser doesn't need to
        re-render everything when the user clears the search field -->
    <s-repo-list
      v-if="(stars && stars.length) || loading"
      v-show="!isSearching"
      :repositories="stars"
      :busy="loading"
    />
    <div
      v-if="!(isSearching || loading || stars || stars.length)"
      class="text-center text-gray-600"
    >
      <star-svg class="inline h-6" />
      <p class="mt-2">You haven't starred any repositories yet.</p>
    </div>

    <!-- Search results -->
    <s-repo-list
      v-show="isSearching"
      :repositories="loading ? [] : searchResults"
      :busy="loading"
    />
    <div
      v-if="isSearching && searchResults.length === 0"
      class="text-center text-gray-600"
    >
      <emoji-sad-svg class="inline h-6" />
      <p class="mt-2">Nothing found when searching for "{{ searchString }}".</p>
    </div>
  </s-layout>
</template>

<script>
import SRepoList from "/@/components/SRepoList.vue"
import SButton from "/@/components/SButton.vue"
import SInput from "/@/components/SInput.vue"
import SToolbar from "/@/components/SToolbar.vue"
import { logout } from "/@/utils/auth"
import { config as apiConfig, getStars, getViewer } from "/@/utils/api"
import LogoutSvg from "/@/assets/logout.svg"
import EmojiSadSvg from "/@/assets/emoji-sad.svg"
import StarSvg from "/@/assets/star.svg"
import SearchCircleSvg from "/@/assets/search-circle.svg"
import initSearch from "/@/utils/search"
import SImageIcon from "../components/SImageIcon.vue"
import SLayout from "/@/components/SLayout.vue"

export default {
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
     * Returns whether there is an active search filter. This is considered to be the case when
     * the search string is set and longer than 2 characters.
     *
     * @returns {boolean} True if search is active
     */
    isSearching() {
      return this.searchString && this.searchString.trim().length
    },

    /**
     * Filters the list of starred repository using the current search string.
     *
     * @returns {Array} Filtered stars
     */
    searchResults() {
      if (!this.stars || !this.isSearching) {
        return []
      }

      const result = this.search(this.searchString)
      return this.stars.filter((star) => result.has(star.node.id))
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
    signOut() {
      logout()
      this.$router.push({ name: "Home" })
    },

    /**
     * Fetch viewer and stars data from the API.
     */
    async hydrate() {
      try {
        this.viewer = await getViewer()
        this.stars = await getStars()
      } catch (err) {
        if (err === apiConfig.notLoggedIn || apiConfig.notAuthorized) {
          this.$toast(
            "Looks like your session expired. Please sign in again.",
            {
              type: "warning",
            }
          )

          this.signOut()
        } else {
          this.$toast(err, { type: "warning" })
        }
      } finally {
        this.loading = false
        this.search = initSearch(this.stars)
      }
    },
  },
}
</script>
