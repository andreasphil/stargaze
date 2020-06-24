<template>
  <div id="app" class="font-sans antialiased text-gray-800">
    <b-toaster />
    <router-view />
  </div>
</template>

<script>
import BToaster from '@/blocks/BToaster.vue'

export default {
  components: { BToaster }
}
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;

body {
  @apply bg-gray-100;
}

a {
  @apply text-gray-600 underline transition-colors duration-150;
}

a:hover {
  @apply text-gray-900;
}

@tailwind utilities;
</style>
