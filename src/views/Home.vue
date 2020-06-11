<template>
  <main
    class="container max-w-screen-lg h-screen p-4 flex items-center space-x-16"
  >
    <div class="flex-1">
      <h1 class="font-semibold text-3xl">
        Stargaze
        <span class="text-yellow">Alpha</span>
      </h1>
      <p class="mt-4 mb-12 text-xl">
        A beautiful and fast interface for browsing your starred repositories on
        GitHub.
      </p>
      <c-button
        label="Sign in with GitHub"
        primary
        large
        icon="github"
        @click="signIn"
      />
    </div>
    <img
      class="flex-1 w-1/2 rounded-full bg-gray-700"
      src="@/assets/landing.svg"
    />
  </main>
</template>

<script>
import { getState, getSignInUrl } from '@/utils/auth.js'
import CButton from '@/components/CButton.vue'

export default {
  components: {
    CButton
  },

  methods: {
    /**
     * Initiates the OAuth flow by generating the auth page URL and redirecting the user there.
     */
    signIn() {
      const randomState = getState()
      const url = getSignInUrl(randomState)
      window.location.href = url
    }
  }
}
</script>
