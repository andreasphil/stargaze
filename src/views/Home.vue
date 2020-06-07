<template>
  <div>
    <main class="container p-4 h-screen flex items-center">
      <div class="w-full text-center">
        <h1 class="font-semibold text-2xl mb-8">
          Stargaze
          <span class="text-yellow">Alpha</span>
        </h1>
        <c-button label="Sign in with GitHub" primary large @click="signIn" />
      </div>
    </main>
  </div>
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
