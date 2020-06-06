<template>
  <nav class="container flex px-4 my-4">
    <div class="flex-1 flex items-center font-semibold">
      <span v-if="viewer">Repositories starred by {{ viewer.name }}</span>
    </div>
    <div class="flex-1 flex items-center justify-end">
      <app-button label="Sign out" @click="signOut" />
    </div>
  </nav>
</template>

<script>
import AppButton from '@/components/AppButton.vue'
import gql from 'graphql-tag'
import { onLogout } from '@/vue-apollo'

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
  },

  methods: {
    async signOut() {
      await onLogout(this.$apollo.getClient())
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
