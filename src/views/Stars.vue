<template>
  <div class="pt-16">
    <c-toolbar :busy="$apollo.loading">
      <template v-slot:left v-if="viewer">
        <img class="rounded-full w-12 h-12 mr-4" :src="viewer.avatarUrl" />
        <h2>
          Starred by <span class="font-semibold">{{ viewer.name }}</span>
        </h2>
      </template>

      <template v-slot:center>
        <c-input
          block
          v-model="searchString"
          :placeholder="searchPlaceholder"
        />
      </template>

      <template v-slot:right>
        <c-button label="Sign out" @click="signOut" />
      </template>
    </c-toolbar>

    <main class="container px-4 my-24">
      <b-repo-list v-if="stars" :repositories="stars.edges" />
      <div class="mt-16">
        <c-button
          v-if="hasNext"
          label="Load more..."
          large
          block
          @click="loadNext"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { onLogout } from '@/vue-apollo'
import BRepoList from '@/blocks/BRepoList.vue'
import CButton from '@/components/CButton.vue'
import CInput from '@/components/CInput.vue'
import CToolbar from '@/components/CToolbar.vue'
import gql from 'graphql-tag'

export default {
  components: {
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
            starredRepositories(after: $cursor) {
              totalCount
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
      update: data => data.viewer.starredRepositories,
      variables: {
        cursor: undefined
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
    searchPlaceholder() {
      return this.stars
        ? `Filter ${this.stars.edges.length} of ${this.stars.totalCount} repositories...`
        : 'Filter...'
    },

    hasNext() {
      return this.stars && this.stars.pageInfo.hasNextPage
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
     * Clean up local user data and redirect back to the home page.
     */
    async signOut() {
      onLogout(this.$apollo.getClient())
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
