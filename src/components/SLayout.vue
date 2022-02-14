<script setup lang="ts">
import SFooter from "/@/components/SFooter.vue";
</script>

<template>
  <slot name="toolbar" />
  <div
    :f-fixed-nav="$slots.toolbar ? true : null"
    class="flex flex-col items-stretch min-h-screen"
  >
    <main v-bind="$attrs" f-container class="flex-1 w-full">
      <slot />
    </main>
    <SFooter class="flex-none" />
  </div>
</template>
