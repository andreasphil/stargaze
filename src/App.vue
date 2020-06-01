<template>
  <div id="app" class="font-sans antialiased bg-powder">
    <router-view />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;

:root {
  --color-white: #fff;

  /* https://coolors.co/f7f7f8-f5cb5c-232324-323334-7d8082 */
  --color-crayola: rgb(245, 203, 92);
  --color-crayola-10: rgba(245, 203, 92, 0.3);
  --color-powder: hsl(240, 20%, 99%);
  --color-cultured: hsl(240, 7%, 97%);
  --color-eerie-black: hsl(240, 1%, 14%);
  --color-jet: hsl(210, 2%, 20%);
  --color-web: hsl(204, 2%, 50%);
}

body {
  @apply bg-powder;
}

@tailwind utilities;
</style>
