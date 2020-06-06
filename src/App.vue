<template>
  <div id="app" class="font-sans antialiased text-gray-800">
    <router-view />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;

body {
  @apply bg-gray-100;
}

@tailwind utilities;
</style>
