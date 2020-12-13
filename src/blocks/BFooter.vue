<template>
  <footer class="text-center" :class="{ 'bg-gray-200': inverted }">
    <div class="relative">
      <wave-svg
        class="bg-wave h-48 w-full"
        :class="{ 'bg-wave--inverted': inverted }"
      />
      <outer-space-svg
        class="w-64 absolute bottom-0 left-1/2 transform -translate-x-32"
      />
    </div>

    <p class="text-sm px-4 py-12">
      A thing made by <a :href="authorWebsite">{{ author }}.</a> Check out the
      <a :href="repository">source on GitHub.</a>
    </p>
  </footer>
</template>

<script>
import Meta from '@/utils/metadata.js'
import OuterSpaceSvg from '@/assets/outer-space.svg'
import WaveSvg from '@/assets/wave.svg'

export default {
  components: {
    OuterSpaceSvg,
    WaveSvg
  },

  props: {
    inverted: Boolean
  },

  data() {
    return { ...Meta }
  }
}
</script>

<style lang="postcss" scoped>
.bg-wave {
  @apply text-gray-200;
}

.bg-wave--inverted {
  @apply text-gray-100;
}

.bg-wave path {
  @apply fill-current;
}
</style>
