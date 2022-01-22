<template>
  <ol class="-mx-4">
    <SRepoListItem
      v-for="repository in repositories"
      :key="repository.id"
      :name="repository.name"
      :url="repository.url"
      :author="repository.owner.login"
      :author-url="repository.owner.url"
      :icon="repository.owner.avatarUrl"
      :description="repository.description"
      :homepage="repository.homepageUrl"
      :homepage-title="shorten(repository.homepageUrl)"
    />

    <!-- Skeleton items while the list is loading -->
    <template v-if="busy">
      <SRepoListSkeleton v-for="n in 3" :key="n" />
    </template>
  </ol>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import SRepoListItem from "/@/components/SRepoListItem.vue";
import SRepoListSkeleton from "/@/components/SRepoListSkeleton.vue";
import type { Repository } from "/@/utils/types";

defineProps({
  repositories: { type: Array as PropType<Repository[]>, default: () => [] },
  busy: { type: Boolean, default: false },
});

const shortHomepageUrls: Record<string, string> = {};

const shorten = (input: string) => {
  if (!input) {
    return null;
  }

  if (shortHomepageUrls[input]) {
    return shortHomepageUrls[input];
  }

  let output = input.replace(/^https?:\/\/(www.)?/, "");
  output = output.length > 30 ? `${output.substring(0, 30)}...` : output;
  shortHomepageUrls[input] = output;

  return output;
};
</script>
