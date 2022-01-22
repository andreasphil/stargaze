<template>
  <div
    class="fixed z-20 inset-x-0 top-0 bg-white transition-shadow duration-300"
    :class="{ 'shadow-lg': floating }"
  >
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

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const floating = ref(false);

const updateFloatingState = () => {
  floating.value = window.scrollY > 48;
};

onMounted(() => {
  document.addEventListener("scroll", updateFloatingState, { passive: true });
});

onBeforeUnmount(() => {
  document.removeEventListener("scroll", updateFloatingState);
});
</script>

<style lang="postcss" scoped>
.nav-section {
  @apply flex flex-1 items-center;
}
</style>
