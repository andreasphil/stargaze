<template>
  <input
    class="
      rounded-lg
      px-3
      py-2
      leading-normal
      bg-gray-300
      bg-opacity-25
      placeholder-gray-400
      focus:bg-white
      focus:outline-none
      focus:shadow-outline-yellow
      transition-all
      duration-150
    "
    :class="{ 'w-full': block }"
    :placeholder="placeholder"
    v-model="localValue"
  />
</template>

<script>
export default {
  props: {
    placeholder: String,
    block: Boolean,
    value: {
      type: String,
      default: ''
    }
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
