<template>
  <s-layout>
    <template #toolbar>
      <s-toolbar>
        <template #left>
          <div class="shrink-0 w-10 h-10 bg-gray-100 rounded-full"></div>
          <s-input block disabled class="ml-4" placeholder="Filter...">
            <template #icon>
              <search-circle-svg />
            </template>
          </s-input>
        </template>

        <template #right>
          <div></div>
        </template>
      </s-toolbar>
    </template>

    <s-repo-list :busy="true" />
  </s-layout>
</template>

<script>
import SearchCircleSvg from "/@/assets/search-circle.svg"
import SInput from "/@/components/SInput.vue"
import SLayout from "/@/components/SLayout.vue"
import SRepoList from "/@/components/SRepoList.vue"
import SToolbar from "/@/components/SToolbar.vue"
import { fetchLoginToken, setLoginToken } from "/@/utils/auth"

export default {
  components: { SRepoList, SInput, SToolbar, SLayout, SearchCircleSvg },

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
