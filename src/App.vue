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

<style>
@tailwind base;
@tailwind components;

body {
  @apply bg-gray-100;
}

@tailwind utilities;
</style>
