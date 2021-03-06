<template>
  <div class="pt-20">
    <s-toolbar :busy="true">
      <template #left>
        <div class="flex-shrink-0 rounded-full w-8 h-8 bg-gray-100"></div>
        <s-input block disabled class="ml-4" placeholder="Filter..." />
      </template>

      <template #right>
        <div></div>
      </template>
    </s-toolbar>

    <main class="max-w-screen-xl w-full mx-auto pt-4 px-4 pb-24 md:pt-24">
      <s-repo-list :busy="true" />
    </main>
  </div>
</template>

<script>
import { fetchLoginToken, setLoginToken } from "/@/utils/auth"
import SRepoList from "/@/components/SRepoList.vue"
import SInput from "/@/components/SInput.vue"
import SToolbar from "/@/components/SToolbar.vue"

export default {
  components: { SRepoList, SInput, SToolbar },

  async mounted() {
    const { code } = this.$route.query

    // If there's no code, it's likely that the user ended up on this page by
    // mistake. Redirect back to home.
    if (!code) {
      this.$router.replace({ name: "Home" })
    }

    // Grab and save the token
    try {
      const token = await fetchLoginToken(code)
      setLoginToken(token)

      // Redirect to the actual app
      this.$router.replace({ name: "Stars" })
    } catch {
      this.$toast(
        "Something went wrong while signing you in. Please try again.",
        { type: "warning" }
      )

      this.$router.replace({ name: "Home" })
    }
  },
}
</script>
