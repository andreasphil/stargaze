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
  <div class="m-0">
    <a
      :href="url"
      :title="`Visit ${name} on GitHub`"
      class="flex gap-4 items-center border-2 border-solid border-transparent focus:border-$c-primary hover:bg-$c-surface-variant-bg px-4 py-2 rounded-$border-radius-large no-underline"
      data-fine-transition
    >
      <SImageIcon
        :alt="author ? `GitHub avatar of ${author}` : ''"
        :src="icon"
        height="56"
        width="56"
      />
      <span class="text-$c-fg-variant">
        <strong class="text-$c-primary block line-clamp-1"
          >@{{ author }}/{{ name }}</strong
        >
        <small class="block line-clamp-1" v-if="description">{{
          description
        }}</small>
      </span>
    </a>
  </div>
</template>
