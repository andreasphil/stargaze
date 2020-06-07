<template>
  <div
    class="
      fixed
      top-0
      left-0
      w-full
      bg-white
      border-t-4
      border-yellow
      shadow-sm
    "
    :class="{ busy }"
  >
    <nav class="container flex px-4 py-2">
      <div v-if="$slots.left" class="nav-section">
        <slot name="left" />
      </div>

      <div v-if="$slots.right" class="nav-section justify-center">
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

@keyframes border-pulse {
  to {
    @apply border-transparent;
  }
}
</style>
