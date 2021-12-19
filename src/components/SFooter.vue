<template>
  <footer class="bg-gray-50">
    <p class="px-4 py-12 text-center text-sm">
      A thing made by <a :href="authorWebsite">{{ author }}.</a> Check out the
      <a :href="repository">source on GitHub.</a>
    </p>
  </footer>
</template>

<script>
import { defineComponent } from "vue"
import meta from "/@/utils/metadata.js"

export default defineComponent({
  setup() {
    return {
      author: meta.author,
      authorWebsite: meta.authorWebsite,
      repository: meta.repository,
    }
  },
})
</script>
