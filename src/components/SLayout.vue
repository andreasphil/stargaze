<template>
  <slot name="toolbar" />

  <div
    class="flex flex-col items-stretch min-h-screen"
    :class="{ 'pt-20': !!$slots.toolbar }"
  >
    <main class="container flex-1 px-4 normal:py-20 py-10" v-bind="$attrs">
      <slot />
    </main>
    <s-footer class="flex-none" />
  </div>
</template>

<script>
import SFooter from "/@/components/SFooter.vue"

export default {
  components: {
    SFooter,
  },
}
</script>
