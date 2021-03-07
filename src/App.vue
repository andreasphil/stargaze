<template>
  <s-toaster />
  <router-view />
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
  @apply text-gray-800 font-sans antialiased bg-white;
}

a {
  @apply text-gray-500 underline transition-colors duration-150;
}

a:hover {
  @apply text-gray-900;
}

@tailwind utilities;
</style>
