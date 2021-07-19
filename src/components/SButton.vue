<template>
  <button
    class="
      inline-flex
      items-center
      px-4
      py-3
      leading-none
      hover:bg-gray-100
      rounded
      space-x-2
      transition-all
      duration-150
    "
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
  @apply ring-4 ring-primary-200;
}

[large] {
  @apply px-5 py-4;
}

[inverted] {
  @apply bg-gray-700 text-gray-100;
}

[inverted]:hover {
  @apply bg-gray-600;
}
</style>
