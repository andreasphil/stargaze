<script setup lang="ts">
defineProps({
  label: { type: String, required: true },
  role: { type: String, default: "button" },
  tag: { type: String, default: "button" },
});
</script>

<template>
  <component :is="tag" :role="role" class="flex items-center gap-2">
    <span v-if="$slots.default">
      <slot />
    </span>
    <span>{{ label }}</span>
  </component>
</template>
