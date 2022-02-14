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
  --button-padding-x: 1rem;
  --button-padding-y: 0.5rem;
  --h1-font-size: 2.25rem;
  --input-padding-x: var(--button-padding-x);
  --input-padding-y: var(--button-padding-y);
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
