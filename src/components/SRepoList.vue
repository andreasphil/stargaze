<script setup lang="ts">
import { PropType } from "vue";
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import SRepoListItem from "/@/components/SRepoListItem.vue";
import type { Repository } from "/@/utils/types";

defineProps({
  repositories: { type: Array as PropType<Repository[]>, default: () => [] },
});
</script>

<template>
  <RecycleScroller
    :item-size="76"
    :items="repositories"
    class="p-0 my-0 -mx-4"
    key-field="url"
    v-slot="{ item }"
  >
    <SRepoListItem
      :author="item.owner.login"
      :description="item.description"
      :homepage="item.homepageUrl"
      :icon="item.owner.avatarUrl"
      :key="item.id"
      :name="item.name"
      :url="item.url"
    />
  </RecycleScroller>
</template>
