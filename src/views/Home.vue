<template>
  <s-layout class="text-center flex items-center justify-center flex-col">
    <h1 class="font-semibold text-primary-500">Stargaze</h1>
    <h2 class="font-bold text-4xl max-w-3xl mt-4 mb-16 leading-normal">
      A faster way of browsing and searching your starred repositories on GitHub
    </h2>

    <s-button label="Sign in with GitHub" primary large @click="signIn">
      <github-svg />
    </s-button>
  </s-layout>
</template>

<script>
import { getState, getSignInUrl } from "/@/utils/auth.js"
import SButton from "/@/components/SButton.vue"
import GithubSvg from "/@/assets/github.svg"
import SLayout from "/@/components/SLayout.vue"

export default {
  components: {
    SButton,
    GithubSvg,
    SLayout,
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
