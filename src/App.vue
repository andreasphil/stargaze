<template>
  <s-toaster-provider>
    <router-view />
  </s-toaster-provider>
</template>

<script>
import { defineComponent } from "vue"
import SToasterProvider from "./components/SToasterProvider.vue"

export default defineComponent({
  components: { SToasterProvider },
})
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

svg {
  @apply h-text-5;
}

@tailwind utilities;
</style>
