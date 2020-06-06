<template>
  <div>
    <main class="container p-4 h-screen flex items-center">
      <div class="w-full text-center">
        <h1 class="font-semibold text-2xl mb-8">
          Stargaze
          <span class="text-yellow-500 font-medium">Alpha</span>
        </h1>
        <app-button label="Sign in with GitHub" primary @click="signIn" />
      </div>
    </main>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton.vue'
import { getState, getSignInUrl } from '@/utils/auth.js'

export default {
  components: {
    AppButton
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
