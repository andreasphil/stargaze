<template>
  <div class="min-h-screen flex flex-col items-stretch pt-20">
    <s-toolbar :busy="loading">
      <template v-slot:left>
        <img
          v-if="viewer"
          class="flex-shrink-0 rounded-full w-8 h-8"
          alt="Your GitHub avatar"
          :src="viewer.avatarUrl"
        />
        <div
          v-else
          class="flex-shrink-0 rounded-full w-8 h-8 bg-gray-100"
        ></div>

        <s-input
          ref="search"
          icon="search"
          class="ml-4 w-full"
          v-model="searchString"
          placeholder="Filter..."
          title="Tip: Type anywhere to start filtering!"
          :spellcheck="false"
        >
          <template v-slot:icon>
            <search-circle-svg />
          </template>
        </s-input>
      </template>

      <template v-slot:right>
        <s-button label="Sign out" @click="signOut">
          <template v-slot:icon><logout-svg /></template>
        </s-button>
      </template>
    </s-toolbar>

    <main
      class="flex-1 w-full max-w-screen-xl mx-auto pt-4 px-4 pb-24 md:pt-24"
    >
      <!-- Always keep the full list in the background so the browser doesn't need to
      re-render everything when the user clears the search field -->
      <s-repo-list
        v-if="stars || loading"
        v-show="!isSearching"
        :repositories="stars || []"
        :busy="loading"
      />
      <div
        v-if="!isSearching && !loading && (!stars || stars.length === 0)"
        class="text-center text-gray-600"
      >
        <star-svg class="h-6 inline" />
        <p class="mt-2">You haven't starred any repositories yet.</p>
      </div>

      <!-- Search results -->
      <s-repo-list
        v-show="isSearching"
        :repositories="searchResults"
        :busy="loading"
      />
      <div
        v-if="isSearching && searchResults.length === 0"
        class="text-center text-gray-600"
      >
        <emoji-sad-svg class="h-6 inline" />
        <p class="mt-2">
          Nothing found when searching for "{{ searchString }}".
        </p>
      </div>
    </main>

    <s-footer inverted />
  </div>
</template>

<script>
import SFooter from "/@/components/SFooter.vue"
import SRepoList from "/@/components/SRepoList.vue"
import SButton from "/@/components/SButton.vue"
import SInput from "/@/components/SInput.vue"
import SToolbar from "/@/components/SToolbar.vue"
import { logout } from "/@/utils/auth"
import { api, getStars, getViewer } from "/@/utils/api"
import LogoutSvg from "/@/assets/logout.svg"
import EmojiSadSvg from "/@/assets/emoji-sad.svg"
import StarSvg from "/@/assets/star.svg"
import SearchCircleSvg from "/@/assets/search-circle.svg"

export default {
  components: {
    SFooter,
    SRepoList,
    SButton,
    SInput,
    SToolbar,
    EmojiSadSvg,
    LogoutSvg,
    StarSvg,
    SearchCircleSvg,
  },

  data() {
    return {
      searchString: "",
      search: () => new Set(),
      loading: true,
      viewer: undefined,
      stars: undefined,
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
      return this.searchString && this.searchString.trim().length >= 3
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

  methods: {
    focusSearchHotkey(event) {
      // If the event key is a single word character (0-9, a-z) and the search
      // field is not focused yet, treat the input as an input to the search
      // field
      if (event.key.match(/^[\w/]$/) && !this.$refs.search.focused()) {
        this.searchString = event.key
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
        if (err === api.notLoggedIn || api.notAuthorized) {
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
      }
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
}
</script>
