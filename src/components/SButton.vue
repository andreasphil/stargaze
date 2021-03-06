<template>
  <button
    class="rounded inline-flex items-center space-x-2 px-4 py-3 leading-none hover:bg-gray-100 transition-colors duration-150"
    :role="role"
    @click="$emit('click')"
  >
    <slot name="icon" />
    <span>{{ label }}</span>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "button",
    },
  },
  emits: ["click"],
}
</script>

<style lang="postcss" scoped>
[primary] {
  @apply bg-primary-400 text-gray-900 text-opacity-75 font-medium shadow-sm;
}

[primary]:hover {
  @apply bg-primary-400 bg-opacity-75;
}

[large] {
  @apply px-5 py-4;
}

svg {
  @apply h-text-5;
}
</style>
