<template>
  <div
    class="
      fixed
      top-0
      inset-x-0
      bg-white
      border-t-4
      border-yellow
      transition-shadow
      duration-500
      translucent
    "
    :class="{ busy, 'shadow-sm': floating }"
  >
    <nav class="container flex p-4">
      <div v-if="$slots.left" class="nav-section">
        <slot name="left" />
      </div>

      <div v-if="$slots.center" class="nav-section justify-center">
        <slot name="center" />
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
    busy: Boolean
  },

  data() {
    return {
      floating: this.updateFloatingState()
    }
  },

  methods: {
    updateFloatingState() {
      this.floating = window.scrollY > 48
    }
  },

  mounted() {
    document.addEventListener('scroll', this.updateFloatingState)
  },

  beforeDestroy() {
    document.removeEventListener('scroll', this.updateFloatingState)
  }
}
</script>

<style lang="postcss" scoped>
.nav-section {
  @apply flex-1 flex items-center;
}

.busy {
  animation: 0.75s ease-in infinite alternate border-pulse;
}

@supports ((backdrop-filter: blur()) or (-webkit-backdrop-filter: blur())) {
  .translucent {
    @apply bg-opacity-75;
    -webkit-backdrop-filter: blur(1rem) brightness(1.1);
    backdrop-filter: blur(1rem) brightness(1.1);
  }
}

@keyframes border-pulse {
  to {
    @apply border-transparent;
  }
}
</style>
