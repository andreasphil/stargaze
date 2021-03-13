<template>
  <div class="fixed inset-x-0 top-0 z-20 bg-white shadow-sm">
    <nav class="container flex mx-auto p-4 h-20">
      <div v-if="$slots.left" class="nav-section">
        <slot name="left" />
      </div>

      <div v-if="$slots.right" class="justify-end nav-section">
        <slot name="right" />
      </div>
    </nav>
  </div>
</template>

<script>
export default {
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
</style>
