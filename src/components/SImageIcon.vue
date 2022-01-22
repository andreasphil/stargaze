<template>
  <img
    :alt="alt"
    :class="[rounded, width, height]"
    :src="src"
    class="p-1 bg-gray-100"
    loading="lazy"
  />
</template>

<script setup lang="ts">
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: null },
  width: { type: String, default: "w-10" },
  height: { type: String, default: "h-10" },
  rounded: { type: String, default: "rounded-full" },
});
</script>
