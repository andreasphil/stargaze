<template>
  <div class="relative overflow-hidden" :class="[width, height, rounded]">
    <img :src="src" alt="" loading="lazy" class="absolute inset-0 blur" />

    <img
      :src="src"
      :alt="alt"
      loading="lazy"
      class="absolute inset-0 p-1"
      :class="[rounded]"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: "w-10",
    },
    height: {
      type: String,
      default: "h-10",
    },
    rounded: {
      type: String,
      default: "rounded",
    },
  },
}
</script>

<style lang="postcss" scoped>
.blur {
  filter: blur(24px) saturate(1.5) brightness(0.9) contrast(1.2);
}
</style>
