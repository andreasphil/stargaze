<template>
  <div class="relative inline-flex items-center" :class="{ 'w-full': block }">
    <span class="absolute pt-1 pl-4" v-if="icon">
      <c-icon :name="icon" />
    </span>
    <input
      class="
        rounded-lg
        w-full
        px-4
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
      :class="{ 'pl-10': !!icon }"
      :placeholder="placeholder"
      v-model="localValue"
    />
  </div>
</template>

<script>
import CIcon from '@/components/CIcon.vue'

export default {
  components: { CIcon },

  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: String,
    block: Boolean,
    icon: String
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
