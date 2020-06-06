<template>
  <div>
    <app-nav />
    <main class="container px-4 my-24">
      <app-repo-list v-if="stars" :repositories="stars.edges" />
      <div class="mt-6">
        <app-button v-if="hasNext" label="Load next" block @click="loadNext" />
      </div>
    </main>
  </div>
</template>

<script>
import AppRepoList from '@/components/AppRepoList.vue'
import AppButton from '@/components/AppButton.vue'
import AppNav from '@/components/AppNav.vue'
import gql from 'graphql-tag'

export default {
  components: {
    AppRepoList,
    AppNav,
    AppButton
  },

  apollo: {
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
