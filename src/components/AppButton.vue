<template>
  <button
    class="rounded-lg px-4 py-3 hover:bg-gray-200 focus:outline-none focus:shadow-outline"
    :class="{ primary, block }"
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
    block: Boolean
  }
}
</script>

<style scoped>
.primary {
  @apply bg-gray-800 text-gray-100 font-medium;
}

.block {
  @apply w-full;
}
</style>
