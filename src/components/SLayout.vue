<template>
  <slot name="toolbar" />

  <div
    class="flex flex-col items-stretch min-h-screen"
    :class="{ 'pt-20': !!$slots.toolbar }"
  >
    <main class="container flex-1 px-4 py-10 normal:py-20" v-bind="$attrs">
      <slot />
    </main>
    <s-footer class="flex-none" />
  </div>
</template>

<script>
import { defineComponent } from "vue"
import SFooter from "/@/components/SFooter.vue"

export default defineComponent({
  components: {
    SFooter,
  },
})
</script>
