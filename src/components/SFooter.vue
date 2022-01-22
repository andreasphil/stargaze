<template>
  <footer class="bg-gray-50">
    <p class="px-4 py-12 text-center text-sm">
      A thing made by <a :href="meta.authorWebsite">{{ meta.author }}.</a> Check
      out the
      <a :href="meta.repository">source on GitHub.</a>
    </p>
  </footer>
</template>

<script setup lang="ts">
import meta from "/@/utils/metadata"
</script>
