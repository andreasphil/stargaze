<template>
  <button
    class="rounded-full px-4 py-3 hover:bg-gray-200"
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
    }
  }
}
</script>
