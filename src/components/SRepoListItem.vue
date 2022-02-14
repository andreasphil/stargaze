<script setup lang="ts">
import SImageIcon from "/@/components/SImageIcon.vue";

defineProps<{
  author: string;
  description?: string;
  homepage?: string;
  icon: string;
  name: string;
  url: string;
}>();
</script>

<template>
  <li class="list-none m-0">
    <a
      :href="url"
      :title="`Visit ${name} on GitHub`"
      class="flex gap-4 items-center border-2 border-solid border-transparent focus:border-$c-primary hover:bg-$c-surface-variant-bg px-4 py-2 rounded-$large-border-radius no-underline"
      f-transition
    >
      <SImageIcon
        :alt="author ? `GitHub avatar of ${author}` : ''"
        :src="icon"
        height="40"
        width="40"
      />
      <span class="line-clamp-1 text-$c-fg-variant">
        <strong class="text-$c-primary">@{{ author }}/{{ name }}</strong>
        <span v-if="description"> - {{ description }}</span>
      </span>
    </a>
  </li>
</template>
