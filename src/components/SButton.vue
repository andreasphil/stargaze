<template>
  <component
    :is="tag"
    :role="role"
    class="inline-flex items-center px-4 py-3 leading-none hover:bg-gray-100 rounded space-x-2 transition-all duration-150 no-underline"
  >
    <slot />
    <span>{{ label }}</span>
  </component>
</template>

<script setup lang="ts">
defineProps({
  label: { type: String, required: true },
  role: { type: String, default: "button" },
  tag: { type: String, default: "button" },
})
</script>

<style lang="postcss" scoped>
[primary] {
  @apply text-white font-semibold bg-gradient-to-br from-primary-400 to-primary-700 shadow-lg;
}

[primary]:hover {
  @apply ring-4 ring-primary-200;
}

[large] {
  @apply px-5 py-4;
}

[inverted] {
  @apply text-gray-100 bg-gray-700;
}

[inverted]:hover {
  @apply bg-gray-600;
}
</style>
