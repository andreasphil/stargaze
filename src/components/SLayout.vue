<template>
  <slot name="toolbar" />

  <div
    class="flex flex-col items-stretch min-h-screen"
    :class="{ 'pt-20': !!$slots.toolbar }"
  >
    <main class="container flex-1 px-4 py-10 normal:py-20" v-bind="$attrs">
      <slot />
    </main>
    <SFooter class="flex-none" />
  </div>
</template>

<script setup lang="ts">
import SFooter from "/@/components/SFooter.vue"
</script>
