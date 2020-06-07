<template>
  <button
    class="
      rounded-lg
      px-3
      py-3
      leading-none
      hover:bg-gray-300
      hover:bg-opacity-25
      transition-colors
      duration-150
    "
    :class="{ primary, large, 'w-full': block }"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    primary: Boolean,
    block: Boolean,
    large: Boolean
  }
}
</script>

<style lang="postcss" scoped>
.primary {
  @apply bg-gray-800 text-gray-100 font-medium shadow-sm;
}

.large {
  @apply leading-normal px-4;
}
</style>
