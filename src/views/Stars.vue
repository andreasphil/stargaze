<template>
  <div>
    <b-nav />
    <main class="container px-4 my-24">
      <input
        class="block text-4xl w-full bg-transparent rounded px-4 py-3 my-24 outline-none placeholder-platinum"
        :placeholder="searchPlaceholder"
      />

      <c-tile-list v-if="stars" :repositories="stars" />
    </main>
  </div>
</template>

<script>
import CTileList from '@/components/CTileList.vue'
import BNav from '@/blocks/BNav.vue'
import gql from 'graphql-tag'

export default {
  components: {
    CTileList,
    BNav
  },

  apollo: {
    stars: {
      query: gql`
        query stars($after: String) {
          viewer {
            starredRepositories(after: $after) {
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
      update: data =>
        data.viewer.starredRepositories.edges.map(edge => edge.node)
    },
    starsCount: {
      query: gql`
        query viewer {
          viewer {
            starredRepositories {
              totalCount
            }
          }
        }
      `,
      update: data => data.viewer.starredRepositories.totalCount
    }
  },

  computed: {
    searchPlaceholder() {
      return `Search ${this.starsCount ? this.starsCount : 0} repositories ...`
    }
  }
}
</script>
