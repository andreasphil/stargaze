<template>
  <div class="fixed top-0 left-1/2 transform -translate-x-1/2 z-10">
    <transition-group name="toast" class="flex flex-col pt-10 space-y-4">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex bg-gray-800 text-gray-100 rounded shadow-md overflow-hidden mx-4 mt-4"
      >
        <span class="flex items-center p-4 bg-gray-900" v-if="toast.type">
          <exclamation-svg v-if="toast.type === 'warning'" />
        </span>
        <span class="p-4">
          {{ toast.text }}
        </span>
      </div>
    </transition-group>
  </div>
</template>

<script>
import ExclamationSvg from "/@/assets/exclamation.svg"

export default {
  components: {
    ExclamationSvg,
  },

  data() {
    return {
      toasts: [],
    }
  },

  methods: {
    /**
     * Displays a toast message.
     *
     * @param {string} text The text of the toast message
     * @param {ToastOptions} options Additional options of the toast message
     */
    handleToast(text, options) {
      // Prepend the toast to the list
      this.toasts.unshift({
        ...options,
        text,
        id: Date.now(),
      })

      // Schedule removing it from the list again
      setTimeout(() => {
        this.toasts.pop()
      }, 10000)
    },
  },

  mounted() {
    // Subscribe to new toasts
    this.$toastOn(this.handleToast)
  },

  beforeUnmount() {
    // Clean up toast subscription
    this.$toastOff(this.handleToast)
  },
}
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
  @apply transform -translate-y-4 scale-75 opacity-0;
}

.toast-leave-to {
  @apply transform scale-90 opacity-0;
}
</style>