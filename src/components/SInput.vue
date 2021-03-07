<template>
  <div class="relative inline-flex items-center">
    <span v-if="$slots.icon" class="absolute pl-4 text-gray-600">
      <slot name="icon" />
    </span>
    <input
      ref="input"
      v-model="localValue"
      class="placeholder-gray-600 px-4 py-2 w-full leading-normal bg-gray-100 focus:bg-white border focus:border-primary-500 border-transparent rounded outline-none disabled:opacity-50 transition-all duration-150 focus:ring-primary-200 focus:ring-4"
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

<style lang="postcss" scoped>
svg {
  @apply h-text-5;
}
</style>
