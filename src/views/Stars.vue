<template>
  <div class="min-h-screen flex flex-col items-stretch pt-20">
    <c-toolbar :busy="$apollo.loading">
      <template v-slot:left>
        <img
          v-if="viewer"
          class="flex-shrink-0 rounded-full w-8 h-8"
          :src="viewer.avatarUrl"
        />
        <div
          v-else
          class="flex-shrink-0 rounded-full w-8 h-8 bg-gray-100"
        ></div>

        <c-input
          ref="search"
          block
          icon="search"
          class="ml-4"
          v-model="searchString"
          placeholder="Filter..."
          :disabled="$apollo.loading"
        />
      </template>

      <template v-slot:right>
        <c-button label="Sign out" icon="log-out" @click="signOut" />
      </template>
    </c-toolbar>

    <main
      class="flex-1 w-full max-w-screen-xl mx-auto pt-4 px-4 pb-24 md:pt-24"
    >
      <b-repo-list :repositories="filteredStars" :busy="$apollo.loading" />
    </main>

    <b-footer inverted />
  </div>
</template>

<script>
import { onLogout } from '@/vue-apollo'
import BFooter from '@/blocks/BFooter.vue'
import BRepoList from '@/blocks/BRepoList.vue'
import CButton from '@/components/CButton.vue'
import CInput from '@/components/CInput.vue'
import CToolbar from '@/components/CToolbar.vue'
import gql from 'graphql-tag'

export default {
  components: {
    BFooter,
    BRepoList,
    CButton,
    CInput,
    CToolbar
  },

  data() {
    return {
      searchString: ''
    }
  },

  apollo: {
    /**
     * Query for starred repositories by the current user.
     */
    stars: {
      query: gql`
        query stars($cursor: String) {
          viewer {
            starredRepositories(
              after: $cursor
              orderBy: { direction: DESC, field: STARRED_AT }
            ) {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  id
                  name
                  owner {
                    avatarUrl
                    login
                    url
                  }
                  description
                  descriptionHTML
                  url
                  homepageUrl
                  primaryLanguage {
                    name
                  }
                }
              }
            }
          }
        }
      `,

      update: data =>
        data.viewer ? data.viewer.starredRepositories : undefined,

      variables() {
        return { cursor: undefined }
      },

      result(response) {
        // If there's more data, load it automatically
        if (this.hasNext) {
          this.loadNext()
        }
      }
    },

    /**
     * Query for profile data of the current user.
     */
    viewer: gql`
      query viewer {
        viewer {
          name
          avatarUrl
        }
      }
    `
  },

  computed: {
    /**
     * @returns True if there's more data that can be fetched from the API.
     */
    hasNext() {
      return this.stars && this.stars.pageInfo.hasNextPage
    },

    /**
     * Filters the list of starred repository using the current search string. The filter returns
     * all items where the name, description, owner name or language name contain the current
     * search string (not case sensitive).
     *
     * TODO: This is kinda brute force, maybe there's a better way to do this
     *
     * @returns {Array} Filtered stars
     */
    filteredStars() {
      if (!this.stars || !this.stars.edges) {
        return []
      }

      if (this.searchString.trim() === '' || this.searchString.length < 3) {
        return this.stars.edges
      }

      const s = this.searchString.toLowerCase()

      const filteredStars = this.stars.edges.filter(star => {
        const { name, description, owner, primaryLanguage: lang } = star.node
        return (
          name.toLowerCase().indexOf(s) >= 0 ||
          (!!description && description.toLowerCase().indexOf(s) >= 0) ||
          owner.login.toLowerCase().indexOf(s) >= 0 ||
          (!!lang && !!lang.name && lang.name.toLowerCase().indexOf(s) >= 0)
        )
      })

      return filteredStars
    }
  },

  methods: {
    /**
     * Query the next batch of starred repositories from the API.
     */
    loadNext() {
      this.$apollo.queries.stars.fetchMore({
        variables: {
          cursor: this.stars.pageInfo.endCursor
        },
        updateQuery: (before, { fetchMoreResult }) => {
          // Merge meta data and the previous + new result set
          const after = Object.assign({}, before, fetchMoreResult)
          after.viewer.starredRepositories.edges = [
            ...before.viewer.starredRepositories.edges,
            ...fetchMoreResult.viewer.starredRepositories.edges
          ]

          return after
        }
      })
    },

    /**
     * Event handler for focusing the search input when a specific hotkey is pressed.
     */
    focusSearchHotkey(event) {
      if (event.key === '/') {
        this.$refs.search.focus()
      }
    },

    /**
     * Clean up local user data and redirect back to the home page.
     */
    async signOut() {
      onLogout(this.$apollo.getClient())
      this.$router.push({ name: 'Home' })
    }
  },

  mounted() {
    // Set up search hotkey
    document.addEventListener('keyup', this.focusSearchHotkey)
  },

  destroyed() {
    // Remove search hotkey
    document.removeEventListener('keyup', this.focusSearchHotkey)
  }
}
</script>
