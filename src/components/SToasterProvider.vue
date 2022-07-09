<script lang="ts" setup>
import { onUnmounted, provide, ref } from "vue";
import ExclamationSvg from "/@/assets/exclamation.svg?component";
import { Toast, ToasterProvider, ToastOptions } from "/@/utils/types";

const defaultOpts: ToastOptions = {
  type: "warning",
};

const toasts = ref<Toast[]>([]);

const timeouts = new Set<ReturnType<typeof setTimeout>>();
onUnmounted(() => timeouts.forEach((timeout) => clearTimeout(timeout)));

const handleToast = (text: string, options: ToastOptions) => {
  // Prepend the toast to the list
  toasts.value.unshift({ ...options, text, id: Date.now() });

  // Schedule removing it from the list again
  const scheduledRemoval = setTimeout(() => {
    toasts.value.pop();
    timeouts.delete(scheduledRemoval);
  }, 10000);

  timeouts.add(scheduledRemoval);
};

provide(ToasterProvider, (text, options) => {
  const opts = { ...defaultOpts, ...options };
  handleToast(text, opts);
});
</script>

<template>
  <div
    class="fixed z-30 transform normal:left-1/2 top-0 normal:-translate-x-1/2"
  >
    <div class="flex flex-col pt-4 space-y-4">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="bg-$c-fg flex gap-4 items-center mx-4 p-4 rounded-$border-radius shadow-high text-$c-bg"
      >
        <ExclamationSvg v-if="toast.type === 'warning'" />
        {{ toast.text }}
      </div>
    </div>
  </div>
  <slot />
</template>
