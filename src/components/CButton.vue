<template>
  <button
    class="
      rounded
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
    :role="role"
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
    large: Boolean,
    role: {
      type: String,
      default: 'button'
    }
  }
}
</script>

<style lang="postcss" scoped>
.primary {
  @apply bg-yellow text-gray-900 text-opacity-75 font-medium shadow-sm;
}

.primary:hover {
  @apply bg-yellow bg-opacity-75;
}

.large {
  @apply px-5 py-4;
}
</style>
