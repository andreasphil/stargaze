<template>
  <button
    class="px-4 py-3 inline-flex items-center space-x-2 leading-none rounded hover:bg-gray-100 transition-all duration-150"
    :role="role"
    @click="$emit('click')"
  >
    <slot />
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
  @apply text-white font-semibold bg-primary-500 shadow-lg;
}

[primary]:hover {
  @apply ring-primary-200 ring-4;
}

[large] {
  @apply px-5 py-4;
}

svg {
  @apply h-text-5;
}
</style>
