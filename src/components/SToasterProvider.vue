<template>
  <div class="fixed z-30 normal:left-1/2 top-0 normal:-translate-x-1/2">
    <div class="flex flex-col pt-4 space-y-4">
      <transition-group name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="flex mx-4 text-gray-100 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-md overflow-hidden"
        >
          <span v-if="toast.type" class="flex items-center p-4 bg-gray-900">
            <ExclamationSvg v-if="toast.type === 'warning'" />
          </span>
          <span class="p-4">
            {{ toast.text }}
          </span>
        </div>
      </transition-group>
    </div>
  </div>
  <slot />
</template>

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

<style lang="postcss" scoped>
svg {
  @apply h-text-5;
}

.toast-enter-active,
.toast-leave-active {
  @apply transition-all duration-150;
}

.toast-enter {
  @apply opacity-0 -translate-y-4 scale-75;
}

.toast-leave-to {
  @apply opacity-0 scale-90;
}
</style>
