<template>
  <span
    class="inline-block"
    :class="{ middle: 'icon-middle' }"
    :style="{ width: size, height: size }"
    v-html="svg"
  ></span>
</template>

<script>
import feather from 'feather-icons'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: '1rem'
    },
    middle: Boolean
  },

  computed: {
    /**
     * Return the SVG icon with the provided name if it exists.
     */
    svg() {
      return feather.icons[this.name]
        ? feather.icons[this.name].toSvg({
            width: this.size,
            height: this.size
          })
        : ''
    }
  }
}
</script>

<style lang="postcss">
.feather {
  @apply inline align-baseline;
}

.icon-middle .feather {
  @apply align-middle;
}
</style>
