<script setup lang="ts">
import SFooter from "/@/components/SFooter.vue";
</script>

<template>
  <slot name="toolbar" />
  <div
    :data-fine-nav="$slots.toolbar ? 'fixed' : null"
    class="flex flex-col items-stretch min-h-screen"
  >
    <main v-bind="$attrs" data-fine-container class="flex-1 w-full">
      <slot />
    </main>
    <SFooter class="flex-none" />
  </div>
</template>
