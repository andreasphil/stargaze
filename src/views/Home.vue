<template>
  <div class="min-h-screen flex flex-col text-center">
    <main
      class="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-gray-100"
    >
      <h1 class="text-sm uppercase font-semibold leading-normal">
        Stargaze
        <span class="rounded ml-1 py-1 px-2 bg-gray-600 text-gray-100"
          >Beta</span
        >
      </h1>
      <h2 class="font-bold text-4xl max-w-3xl mt-4 mb-16 leading-normal">
        A beautiful and fast interface for browsing your starred repositories on
        GitHub
      </h2>

      <s-button label="Sign in with GitHub" primary large @click="signIn">
        <template #icon><github-svg /></template>
      </s-button>
    </main>

    <s-footer />
  </div>
</template>

<script>
import { getState, getSignInUrl } from "/@/utils/auth.js"
import SFooter from "/@/components/SFooter.vue"
import SButton from "/@/components/SButton.vue"
import GithubSvg from "/@/assets/github.svg"

export default {
  components: {
    SFooter,
    SButton,
    GithubSvg,
  },

  methods: {
    /**
     * Initiates the OAuth flow by generating the auth page URL and redirecting the user there.
     */
    signIn() {
      // TODO: Make this a normal link
      window.location.href = getSignInUrl({
        state: getState(),
        clientId: import.meta.env.VITE_APP_AUTH_CLIENT_ID,
        redirectTo: `${window.location.origin}/auth`,
      })
    },
  },
}
</script>
