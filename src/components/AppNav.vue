<template>
  <nav class="container flex px-4 my-4">
    <div class="flex-1 flex items-center">
      ⭐️
      <span v-if="viewer" class="font-semibold ml-3"
        >Repositories starred by {{ viewer.name }}</span
      >
    </div>
    <div class="flex-1 flex items-center justify-end">
      <app-button label="Sign out" />
    </div>
  </nav>
</template>

<script>
import AppButton from '@/components/AppButton.vue'
import gql from 'graphql-tag'

export default {
  components: { AppButton },

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
