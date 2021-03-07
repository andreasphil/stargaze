<template>
  <slot name="toolbar" />

  <div
    class="min-h-screen flex flex-col items-stretch"
    :class="{ 'pt-20': !!$slots.toolbar }"
  >
    <main class="container flex-1 py-8 px-4 normal:py-20" v-bind="$attrs">
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
