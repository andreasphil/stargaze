<template>
  <div class="pt-20">
    <c-toolbar :busy="true">
      <template v-slot:left>
        <div class="flex-shrink-0 rounded-full w-8 h-8 bg-gray-100"></div>
        <c-input block disabled class="ml-4" placeholder="Filter..." />
      </template>

      <template v-slot:right>
        <div></div>
      </template>
    </c-toolbar>

    <main class="max-w-screen-xl w-full mx-auto pt-4 px-4 pb-24 md:pt-24">
      <b-repo-list :busy="true" />
    </main>
  </div>
</template>

<script>
import { getAccessToken } from '@/utils/auth'
import { onLogin } from '@/vue-apollo'
import BRepoList from '@/blocks/BRepoList.vue'
import CInput from '@/components/CInput.vue'
import CToolbar from '@/components/CToolbar.vue'

export default {
  components: { BRepoList, CInput, CToolbar },

  async mounted() {
    const { code } = this.$route.query

    // If there's no code, it's likely that the user ended up on this page by mistake. Redirect
    // back to home.
    if (!code) {
      this.$router.push({ name: 'Home' })
    }

    // Get the token and re-initialize apollo with the login information
    const token = await getAccessToken(code)
    await onLogin(this.$apollo.getClient(), token)

    // Redirect to the actual app
    this.$router.replace({ name: 'Stars' })
  }
}
</script>
