<template>
  <SToasterProvider>
    <router-view />
  </SToasterProvider>
</template>

<script setup lang="ts">
import "finecss/dist/index.min.css";
import "virtual:windi.css";
import SToasterProvider from "./components/SToasterProvider.vue";
</script>

<style>
:root {
  --body-padding-y: 0;
  --rem-base: 16px;
  --c-primary: hsl(var(--tint), 90%, 70%);
  --tint: 240;
}

@media (prefers-color-scheme: dark) {
  :root {
    --c-primary-container: hsl(var(--tint) 90% 70% / 0.3);
  }
}
</style>
