<template>
  <SToasterProvider>
    <router-view />
  </SToasterProvider>
</template>

<script setup lang="ts">
import SToasterProvider from "./components/SToasterProvider.vue";
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
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
}
</style>
