<template>
  <footer class="bg-gray-50">
    <p class="px-4 py-12 text-center text-sm">
      A thing made by <a :href="authorWebsite">{{ author }}.</a> Check out the
      <a :href="repository">source on GitHub.</a>
    </p>
  </footer>
</template>

<script>
import meta from "/@/utils/metadata.js"

export default {
  data() {
    return { ...meta }
  },
}
</script>
