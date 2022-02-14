<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  disabled: Boolean,
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: null },
  spellcheck: { type: Boolean, default: true },
  title: { type: String, default: null },
});

const emit = defineEmits(["update:modelValue"]);

const localModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});

// Expose focus helpers to parent component
const inputEl = ref<HTMLInputElement>();
defineExpose({
  focus: () => inputEl.value?.focus(),
  focused: () => document.activeElement === inputEl.value,
});
</script>

<template>
  <div class="relative inline-flex items-center">
    <span v-if="$slots.icon" class="absolute pl-3 text-$c-fg-variant">
      <slot name="icon" />
    </span>
    <input
      ref="inputEl"
      v-model="localModelValue"
      :class="{ 'pl-9': !!$slots.icon }"
      :disabled="disabled"
      :placeholder="placeholder"
      :spellcheck="spellcheck"
      :title="title"
    />
  </div>
</template>
