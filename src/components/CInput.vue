<template>
  <div class="relative inline-flex items-center" :class="{ 'w-full': block }">
    <span class="absolute pt-1 pl-4" v-if="icon">
      <c-icon :name="icon" />
    </span>
    <input
      ref="input"
      class="
        rounded
        w-full
        px-4
        py-2
        leading-normal
        bg-gray-300
        bg-opacity-25
        border-2
        border-transparent
        placeholder-gray-400
        focus:bg-white
        focus:outline-none
        focus:border-yellow
        disabled:opacity-50
        transition-all
        duration-150
      "
      :class="{ 'pl-10': !!icon }"
      :placeholder="placeholder"
      :disabled="disabled"
      :spellcheck="spellcheck"
      :title="title"
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
    title: String,
    block: Boolean,
    icon: String,
    disabled: Boolean,
    spellcheck: {
      type: Boolean,
      default: true
    }
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
        this.$emit('input', value)
      }
    }
  },

  methods: {
    focus() {
      this.$refs.input.focus()
    },

    focused() {
      return document.activeElement === this.$refs.input
    }
  }
}
</script>
