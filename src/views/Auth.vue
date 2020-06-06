<template>
  <div class="p-4 text-center">You're being authenticated</div>
</template>

<script>
import { getAccessToken } from '@/utils/auth'
import { onLogin } from '@/vue-apollo'

export default {
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
