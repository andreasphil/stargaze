<script setup lang="ts">
import { PropType } from "vue";
import SRepoListItem from "/@/components/SRepoListItem.vue";
import type { Repository } from "/@/utils/types";

defineProps({
  repositories: { type: Array as PropType<Repository[]>, default: () => [] },
});
</script>

<template>
  <ol class="p-0 my-0 -mx-4">
    <SRepoListItem
      v-for="repository in repositories"
      :author="repository.owner.login"
      :description="repository.description"
      :homepage="repository.homepageUrl"
      :icon="repository.owner.avatarUrl"
      :key="repository.id"
      :name="repository.name"
      :url="repository.url"
    />
  </ol>
</template>
