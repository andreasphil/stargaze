<template>
  <div>
    <main class="container p-4 h-screen flex items-center">
      <div class="w-full text-center">
        <h1 class="font-semibold text-2xl mb-8">
          GitHub Stars Explorer
          <span class="text-yellow-500 font-medium">Alpha</span>
        </h1>
        <c-button label="Sign in with GitHub" primary @click="signIn" />
      </div>
    </main>
  </div>
</template>

<script>
import CButton from '@/components/CButton.vue'

export default {
  components: {
    CButton
  },

  methods: {
    signIn() {
      this.$router.push({ name: 'Stars' })
    }
  }
}
</script>
