<template>
  <c-nav>
    <template v-slot:left>
      ⭐️
      <span v-if="viewer" class="font-semibold ml-3"
        >Repositories starred by {{ viewer.name }}</span
      >
    </template>
    <template v-slot:right>
      <c-button label="Sign out" />
    </template>
  </c-nav>
</template>

<script>
import CNav from '@/components/CNav.vue'
import CButton from '@/components/CButton.vue'
import gql from 'graphql-tag'

export default {
  components: { CNav, CButton },

  apollo: {
    viewer: gql`
      query viewer {
        viewer {
          name
        }
      }
    `
  }
}
</script>
