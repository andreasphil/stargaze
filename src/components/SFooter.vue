<script setup lang="ts">
import meta from "/@/utils/metadata";
import GithubSvg from "/@/assets/github.svg?component";
</script>

<template>
  <footer
    class="w-full text-$c-fg-variant py-20 flex justify-between items-center"
    data-fine-container
  >
    <small>
      A thing made by <a :href="meta.authorWebsite">{{ meta.author }}.</a>
    </small>

    <a :href="meta.repository" title="Source code on GitHub">
      <GithubSvg />
    </a>
  </footer>
</template>
