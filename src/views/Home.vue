<template>
  <div class="min-h-screen flex flex-col text-center">
    <main
      class="
        flex-1
        flex
        flex-col
        items-center
        justify-center
        px-4
        py-12
        bg-gray-200
      "
    >
      <h1 class="text-sm uppercase font-semibold">
        Stargaze
        <span class="rounded ml-1 py-1 px-2 bg-gray-600 text-gray-100"
          >Beta</span
        >
      </h1>
      <h2 class="font-semibold text-4xl max-w-3xl mt-4 mb-16">
        A beautiful and fast interface for browsing your starred repositories on
        GitHub
      </h2>

      <c-button
        label="Sign in with GitHub"
        primary
        large
        icon="github"
        @click="signIn"
      />
    </main>

    <b-footer />
  </div>
</template>

<script>
import { getState, getSignInUrl } from '@/utils/auth.js'
import BFooter from '@/blocks/BFooter.vue'
import CButton from '@/components/CButton.vue'

export default {
  components: { BFooter, CButton },

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
