<template>
  <div>
    <main class="container p-4 h-screen flex items-center">
      <div class="w-full text-center">
        <h1 class="font-semibold text-2xl mb-8">
          Stargaze
          <span class="text-yellow-500 font-medium">Alpha</span>
        </h1>
        <app-button label="Sign in with GitHub" primary @click="signIn" />
      </div>
    </main>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton.vue'

export default {
  components: {
    AppButton
  },

  methods: {
    signIn() {
      this.$router.push({ name: 'Stars' })
    }
  }
}
</script>
