<template>
  <s-layout class="flex flex-col items-center justify-center text-center">
    <h1 class="text-primary-500 text-sm font-bold uppercase">Stargaze</h1>
    <h2 class="mb-16 mt-4 max-w-3xl text-4xl font-extrabold leading-snug">
      A faster way of browsing and searching your starred repositories on GitHub
    </h2>

    <s-button
      :href="signInUrl"
      label="Sign in with GitHub"
      large
      primary
      tag="a"
    >
      <github-svg />
    </s-button>
  </s-layout>
</template>

<script>
import { defineComponent } from "vue"
import GithubSvg from "/@/assets/github.svg"
import SButton from "/@/components/SButton.vue"
import SLayout from "/@/components/SLayout.vue"
import { getSignInUrl, getState } from "/@/utils/api"

export default defineComponent({
  name: "HomePage",

  components: {
    SButton,
    GithubSvg,
    SLayout,
  },

  setup() {
    const signInUrl = getSignInUrl({
      state: getState(),
      clientId: import.meta.env.VITE_APP_AUTH_CLIENT_ID,
      redirectTo: `${window.location.origin}/auth`,
    })

    return { signInUrl }
  },
})
</script>
