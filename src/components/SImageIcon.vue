<script setup lang="ts">
defineProps({
  alt: { type: String, default: null },
  height: { type: String, required: true },
  rounded: { type: String, default: "rounded-full" },
  src: { type: String, required: true },
  width: { type: String, required: true },
});
</script>

<template>
  <img
    :alt="alt"
    :class="[rounded]"
    :height="height"
    :src="src"
    :width="width"
    class="p-0.5 bg-$c-surface-variant-bg"
    data-fine-transition
    loading="lazy"
  />
</template>
