<template>
  <footer class="bg-gray-50">
    <p class="text-center text-sm px-4 py-12">
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
