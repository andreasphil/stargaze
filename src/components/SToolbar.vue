<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const floating = ref(false);

const className = computed(() =>
  floating.value ? "shadow-medium bg-$c-surface-bg" : "bg-$c-bg"
);

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

<template>
  <header
    :class="className"
    class="fixed top-0 left-0 right-0 h-20 flex items-center px-4"
    f-transition
  >
    <nav f-container class="w-full flex-nowrap">
      <div v-if="$slots.left" class="flex flex-nowrap items-center flex-auto">
        <slot name="left" />
      </div>

      <div v-if="$slots.right" class="flex flex-nowrap items-center flex-none">
        <slot name="right" />
      </div>
    </nav>
  </header>
</template>
