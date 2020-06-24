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
      <h1 class="font-semibold text-4xl">
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
    </main>

    <footer class="pb-12">
      <div class="p-4 pb-12 bg-wave">
        <img class="w-64 mx-auto" src="@/assets/outer-space.svg" />
      </div>
      <p class="text-sm px-4">
        A thing made by <a :href="authorWebsite">Andreas Philippi.</a> Check out
        the <a :href="repository">source on GitHub!</a>
      </p>
    </footer>
  </div>
</template>

<script>
import { getState, getSignInUrl } from '@/utils/auth.js'
import CButton from '@/components/CButton.vue'
import Meta from '@/utils/metadata.js'

export default {
  components: { CButton },

  data() {
    return {
      repository: Meta.repository,
      authorWebsite: Meta.authorWebsite
    }
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

<style lang="postcss" scoped>
.bg-wave {
  background: url(~@/assets/wave.svg);
  background-size: 100% 100%;
  @apply bg-no-repeat;
}
</style>
