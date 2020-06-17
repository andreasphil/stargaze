<template>
  <button
    class="
      rounded-lg
      inline-flex
      space-x-2
      px-4
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
    <c-icon v-if="icon" :name="icon" />
    <span>{{ label }}</span>
  </button>
</template>

<script>
import CIcon from '@/components/CIcon.vue'

export default {
  components: { CIcon },

  props: {
    label: {
      type: String,
      required: true
    },
    icon: String,
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

.primary:hover {
  @apply bg-gray-900;
}

.large {
  @apply px-5 py-4;
}
</style>
