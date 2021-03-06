<template>
  <div class="relative inline-flex items-center">
    <span v-if="$slots.icon" class="absolute pl-4 text-gray-600">
      <slot name="icon" />
    </span>
    <input
      ref="input"
      v-model="localValue"
      class="rounded w-full px-4 py-2 leading-normal bg-gray-100 border-2 border-transparent placeholder-gray-600 focus:bg-white outline-none focus:border-primary-400 disabled:opacity-50 transition-all duration-150"
      :class="{ 'pl-10': !!$slots.icon }"
      :placeholder="placeholder"
      :disabled="disabled"
      :spellcheck="spellcheck"
      :title="title"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    spellcheck: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
  },

  emits: ["update:modelValue"],

  computed: {
    /**
     * Value bindings for v-model.
     */
    localValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
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
