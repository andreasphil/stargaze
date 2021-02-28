<template>
  <div id="app" class="font-sans antialiased text-gray-800">
    <s-toaster />
    <router-view />
  </div>
</template>

<script>
import SToaster from "/@/components/SToaster.vue"

export default {
  components: { SToaster },
}
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;

body {
  @apply bg-gray-50;
}

a {
  @apply text-gray-600 underline transition-colors duration-150;
}

a:hover {
  @apply text-gray-900;
}

@tailwind utilities;
</style>
