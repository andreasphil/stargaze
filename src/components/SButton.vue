<script setup lang="ts">
defineProps({
  label: { type: String, required: true },
  large: { type: Boolean, default: false },
  role: { type: String, default: "button" },
  tag: { type: String, default: "button" },
});
</script>

<template>
  <component
    :class="{ [$style.large]: large }"
    :is="tag"
    :role="role"
    class="flex items-center gap-2"
  >
    <span v-if="$slots.default">
      <slot />
    </span>
    <span>{{ label }}</span>
  </component>
</template>

<style module>
.large {
  --button-padding-x: 1.25rem;
  --button-padding-y: 1rem;
}
</style>
