<template>
  <div class="relative inline-flex items-center">
    <span v-if="$slots.icon" class="absolute pl-4 text-gray-600">
      <slot name="icon" />
    </span>
    <input
      ref="inputEl"
      v-model="localModelValue"
      :class="{ 'pl-10': !!$slots.icon }"
      :disabled="disabled"
      :placeholder="placeholder"
      :spellcheck="spellcheck"
      :title="title"
      class="placeholder-gray-600 px-4 py-2 w-full leading-normal bg-gray-100 focus:bg-white border focus:border-primary-500 border-transparent rounded outline-none disabled:opacity-50 transition-all duration-150 focus:ring-4 focus:ring-primary-200"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: null },
  title: { type: String, default: null },
  spellcheck: { type: Boolean, default: true },
  disabled: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const inputEl = ref<HTMLInputElement>();

const localModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});

const focus = () => {
  inputEl.value?.focus();
};

const focused = () => {
  return document.activeElement === inputEl.value;
};

defineExpose({ focus, focused });
</script>

<style lang="postcss" scoped>
svg {
  @apply h-text-5;
}
</style>
