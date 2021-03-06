<template>
  <div
    class="fixed top-0 inset-x-0 bg-white border-t-4 border-primary-400 transition-shadow duration-500 z-10"
    :class="{ busy, 'shadow-sm': floating }"
  >
    <nav class="max-w-screen-xl mx-auto flex p-4">
      <div v-if="$slots.left" class="nav-section">
        <slot name="left" />
      </div>

      <div v-if="$slots.right" class="nav-section justify-end">
        <slot name="right" />
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    busy: Boolean,
  },

  data() {
    return {
      floating: this.updateFloatingState(),
    }
  },

  mounted() {
    document.addEventListener("scroll", this.updateFloatingState)
  },

  beforeUnmount() {
    document.removeEventListener("scroll", this.updateFloatingState)
  },

  methods: {
    updateFloatingState() {
      this.floating = window.scrollY > 48
    },
  },
}
</script>

<style lang="postcss" scoped>
.nav-section {
  @apply flex flex-1 items-center;
}

.busy {
  animation: 0.75s ease-in infinite alternate border-pulse;
}

@keyframes border-pulse {
  to {
    @apply border-transparent;
  }
}
</style>
