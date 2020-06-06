<template>
  <div>
    <app-nav />
    <main class="container px-4 my-24">
      <input
        class="block text-4xl w-full bg-transparent rounded px-4 py-3 my-24 outline-none placeholder-platinum"
        :placeholder="searchPlaceholder"
      />

      <app-repo-list v-if="stars" :repositories="stars.edges" />
      <app-button v-if="hasNext" label="Load next" @click="loadNext" />
    </main>
  </div>
</template>

<script>
import AppRepoList from '@/components/AppRepoList.vue'
import AppButton from '@/components/AppButton.vue'
import AppNav from '@/components/AppNav.vue'
import gql from 'graphql-tag'

const PAGE_SIZE = 50

export default {
  components: {
    AppRepoList,
    AppNav,
    AppButton
  },

  apollo: {
    stars: {
      query: gql`
        query stars($cursor: String, $pageSize: Int) {
          viewer {
            starredRepositories(after: $cursor, first: $pageSize) {
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
        pageSize: PAGE_SIZE,
        cursor: undefined
      }
    }
  },

  computed: {
    searchPlaceholder() {
      return `Search ${this.stars ? this.stars.totalCount : 0} repositories ...`
    },

    hasNext() {
      return this.stars && this.stars.pageInfo.hasNextPage
    }
  },

  methods: {
    loadNext() {
      this.$apollo.queries.stars.fetchMore({
        variables: {
          pageSize: PAGE_SIZE,
          cursor: this.stars.pageInfo.endCursor
        },
        updateQuery: (before, { fetchMoreResult }) => {
          const updatedStars = [
            ...before.viewer.starredRepositories.edges,
            ...fetchMoreResult.viewer.starredRepositories.edges
          ]

          const after = Object.assign({}, before, fetchMoreResult)
          after.viewer.starredRepositories.edges = updatedStars

          return after
        }
      })
    }
  }
}
</script>
