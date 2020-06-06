<template>
  <div id="app" class="font-sans antialiased text-gray-800">
    <router-view />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;

:root {
  --white: rgba(255, 255, 255, 1);
  --transparent: rgba(255, 255, 255, 0);

  /* https://coolors.co/1e1f1f-323434-787d7d-dedee3-e9e9ed-f4f4f6-fbe7b2-f8db8c-f5cb5c */
  --eerie-black: rgba(30, 31, 31, 1);
  --jet: rgba(50, 52, 52, 1);
  --gray-web: rgba(120, 125, 125, 1);
  --gainsboro: rgba(222, 222, 227, 1);
  --platinum: rgba(233, 233, 237, 1);
  --cultured: rgba(244, 244, 246, 1);
  --cornsilk: rgba(253, 243, 216, 1);
  --banana-mania: rgba(251, 231, 178, 1);
  --maize-crayola: rgba(245, 203, 92, 1);
}

body {
  @apply bg-gray-100;
}

@tailwind utilities;
</style>
