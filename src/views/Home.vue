<template>
  <s-layout class="flex flex-col items-center justify-center text-center">
    <h1 class="text-primary-500 font-semibold">Stargaze</h1>
    <h2 class="mb-16 mt-4 max-w-3xl text-4xl font-extrabold leading-snug">
      A faster way of browsing and searching your starred repositories on GitHub
    </h2>

    <s-button label="Sign in with GitHub" primary large @click="signIn">
      <github-svg />
    </s-button>
  </s-layout>
</template>

<script>
import GithubSvg from "/@/assets/github.svg"
import SButton from "/@/components/SButton.vue"
import SLayout from "/@/components/SLayout.vue"
import { getSignInUrl,getState } from "/@/utils/auth.js"

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
      window.open(
        getSignInUrl({
          state: getState(),
          clientId: import.meta.env.VITE_APP_AUTH_CLIENT_ID,
          redirectTo: `${window.location.origin}/auth`,
        }),
        "_self"
      )
    },
  },
}
</script>
