<template>
  <div class="fixed z-20 inset-x-0 top-0 bg-white shadow-sm">
    <nav class="container flex mx-auto p-4 h-20">
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
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue"

export default defineComponent({
  setup() {
    const floating = ref(false)

    const updateFloatingState = () => {
      floating.value = window.scrollY > 48
    }

    onMounted(() => {
      document.addEventListener("scroll", updateFloatingState)
    })

    onBeforeUnmount(() => {
      document.removeEventListener("scroll", updateFloatingState)
    })
  },
})
</script>

<style lang="postcss" scoped>
.nav-section {
  @apply flex flex-1 items-center;
}
</style>
