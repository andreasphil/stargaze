<template>
  <div class="relative inline-flex items-center">
    <span class="absolute pl-4 text-gray-600" v-if="$slots.icon">
      <slot name="icon" />
    </span>
    <input
      ref="input"
      class="rounded w-full px-4 py-2 leading-normal bg-gray-100 border-2 border-transparent placeholder-gray-600 focus:bg-white outline-none focus:border-primary-400 disabled:opacity-50 transition-all duration-150"
      :class="{ 'pl-10': !!$slots.icon }"
      :placeholder="placeholder"
      :disabled="disabled"
      :spellcheck="spellcheck"
      :title="title"
      v-model="localValue"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: String,
    title: String,
    disabled: Boolean,
    spellcheck: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    /**
     * Value bindings for v-model.
     */
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      },
    },
  },

  methods: {
    focus() {
      this.$refs.input.focus()
    },

    focused() {
      return document.activeElement === this.$refs.input
    },
  },
}
</script>

<style scoped>
svg {
  @apply h-text-5;
}
</style>
