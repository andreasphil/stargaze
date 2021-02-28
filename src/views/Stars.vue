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
          ><template v-slot:icon>
            <!-- <search-circle-svg /> -->
          </template></s-input
        >
      </template>

      <template v-slot:right>
        <s-button label="Sign out" @click="signOut">
          <!-- <template v-slot:icon><logout-svg /></template> -->
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
        :repositories="stars ? stars.edges : []"
        :busy="loading"
      />
      <div
        v-if="!isSearching && !loading && (!stars || stars.length === 0)"
        class="text-center text-gray-600"
      >
        <!-- <star-svg class="h-6 inline" /> -->
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
        <!-- <emoji-sad-svg class="h-6 inline" /> -->
        <p class="mt-2">
          Nothing found when searching for "{{ searchString }}".
        </p>
      </div>
    </main>

    <s-footer inverted />
  </div>
</template>

<script>
// import { onLogout } from "/@/vue-apollo"
import SFooter from "/@/components/SFooter.vue"
import SRepoList from "/@/components/SRepoList.vue"
import SButton from "/@/components/SButton.vue"
import SInput from "/@/components/SInput.vue"
import SToolbar from "/@/components/SToolbar.vue"
import { logout } from "/@/utils/auth"
// import LogoutSvg from "/@/assets/logout.svg"
// import EmojiSadSvg from "/@/assets/emoji-sad.svg"
// import StarSvg from "/@/assets/star.svg"
// import SearchCircleSvg from "/@/assets/search-circle.svg"

export default {
  components: {
    SFooter,
    SRepoList,
    SButton,
    SInput,
    SToolbar,
    // EmojiSadSvg,
    // LogoutSvg,
    // StarSvg,
    // SearchCircleSvg,
  },

  data() {
    return {
      searchString: "",
      search: () => new Set(),
      loading: false,
      viewer: {
        avatarUrl: "#",
        name: "Max Muster",
      },
      stars: [],
    }
  },

  // apollo: {
  //   /**
  //    * Query for starred repositories by the current user.
  //    */
  //   stars: {
  //     query: gql`
  //       query stars($cursor: String) {
  //         viewer {
  //           starredRepositories(
  //             after: $cursor
  //             orderBy: { direction: DESC, field: STARRED_AT }
  //           ) {
  //             pageInfo {
  //               hasNextPage
  //               endCursor
  //             }
  //             edges {
  //               node {
  //                 id
  //                 name
  //                 owner {
  //                   avatarUrl
  //                   login
  //                   url
  //                 }
  //                 description
  //                 descriptionHTML
  //                 url
  //                 homepageUrl
  //                 primaryLanguage {
  //                   name
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     `,
  //
  //     update: (data) => data?.viewer?.starredRepositories,
  //
  //     variables() {
  //       return { cursor: undefined }
  //     },
  //
  //     result(response) {
  //       if (this.hasNext) {
  //         // If there's more data, load it automatically
  //         this.loadNext()
  //       } else {
  //         // Once we're done loading, build a search index
  //         this.search = index(
  //           response?.data?.viewer?.starredRepositories?.edges,
  //           searchOpts
  //         )
  //       }
  //     },
  //   },
  //
  //   /**
  //    * Query for profile data of the current user.
  //    */
  //   viewer: gql`
  //     query viewer {
  //       viewer {
  //         name
  //         avatarUrl
  //       }
  //     }
  //   `,
  // },

  computed: {
    /**
     * @returns True if there's more data that can be fetched from the API.
     */
    hasNext() {
      return !!this.stars?.pageInfo?.hasNextPage
    },

    /**
     * Returns whether there is an active search filter. This is considered to be the case when
     * the search string is set and longer than 2 characters.
     *
     * @returns True if search is active
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
      if (!this.stars?.edges || !this.isSearching) {
        return []
      }

      const result = this.search(this.searchString)
      return this.stars.edges.filter((star) => result.has(star.node.id))
    },
  },

  methods: {
    /**
     * Query the next batch of starred repositories from the API.
     */
    loadNext() {
      this.$apollo.queries.stars.fetchMore({
        variables: {
          cursor: this.stars.pageInfo.endCursor,
        },
        updateQuery: (before, { fetchMoreResult }) => {
          // Merge meta data and the previous + new result set
          const after = Object.assign({}, before, fetchMoreResult)
          after.viewer.starredRepositories.edges = [
            ...before.viewer.starredRepositories.edges,
            ...fetchMoreResult.viewer.starredRepositories.edges,
          ]

          return after
        },
      })
    },

    focusSearchHotkey(event) {
      // If the event key is a single word character (0-9, a-z) and the search field is not focused
      // yet, treat the input as an input to the search field
      if (event.key.match(/^[\w/]$/) && !this.$refs.search.focused()) {
        this.searchString = event.key
        this.$refs.search.focus()
      }
    },

    /**
     * Clean up local user data and redirect back to the home page.
     */
    async signOut() {
      logout()
      this.$router.push({ name: "Home" })
    },
  },

  mounted() {
    // Set up search hotkey
    document.addEventListener("keyup", this.focusSearchHotkey)
  },

  destroyed() {
    // Remove search hotkey
    document.removeEventListener("keyup", this.focusSearchHotkey)
  },
}
</script>
