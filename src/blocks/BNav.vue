<template>
  <c-nav>
    <template v-slot:left>
      <span
        class="w-2 h-2 bg-crayola-10 rounded-full leading-none py-1/2 text-center mr-3/4"
        >⭐️</span
      >
      <span v-if="viewer" class="font-emphasized"
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
