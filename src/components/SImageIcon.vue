<template>
  <img
    :src="src"
    :alt="alt"
    loading="lazy"
    class="p-1 bg-gray-100"
    :class="[rounded, width, height]"
  />
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
      default: "rounded-full",
    },
  },
}
</script>
