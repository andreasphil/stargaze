<template>
  <footer class="text-center">
    <div class="bg-wave p-4 pb-0" :class="{ 'bg-wave--inverted': inverted }">
      <img class="w-64 mx-auto" src="@/assets/outer-space.svg" alt="" />
    </div>
    <p class="text-sm px-4 py-12" :class="{ 'bg-gray-200': inverted }">
      A thing made by <a :href="authorWebsite">Andreas Philippi.</a> Check out
      the <a :href="repository">source on GitHub!</a>
    </p>
  </footer>
</template>

<script>
import Meta from '@/utils/metadata.js'

export default {
  props: {
    inverted: Boolean
  },

  data() {
    return {
      repository: Meta.repository,
      authorWebsite: Meta.authorWebsite
    }
  }
}
</script>

<style lang="postcss" scoped>
.bg-wave {
  @apply relative;
}

.bg-wave::after {
  content: '';
  background: url(~@/assets/wave.svg);
  background-size: 100% 100%;
  z-index: -1;
  @apply absolute inset-0;
}

.bg-wave--inverted::after {
  transform: rotate(180deg);
}
</style>
