<template>
  <div class="pt-16">
    <c-toolbar :busy="true">
      <template v-slot:left>
        <div class="rounded-full w-8 h-8 bg-gray-100"></div>
      </template>
    </c-toolbar>

    <main class="container px-4 my-24">
      <b-repo-list :busy="true" />
    </main>
  </div>
</template>

<script>
import { getAccessToken } from '@/utils/auth'
import { onLogin } from '@/vue-apollo'
import BRepoList from '@/blocks/BRepoList.vue'
import CToolbar from '@/components/CToolbar.vue'

export default {
  components: { BRepoList, CToolbar },

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
