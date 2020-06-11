<template>
  <ol class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <b-repo-list-item
      v-for="repository in repositories"
      :key="repository.node.id"
      :name="repository.node.name"
      :url="repository.node.url"
      :author="repository.node.owner.login"
      :authorUrl="repository.node.owner.url"
      :icon="repository.node.owner.avatarUrl"
      :description="repository.node.descriptionHTML"
      :homepage="repository.node.homepageUrl"
      :language="
        repository.node.primaryLanguage
          ? repository.node.primaryLanguage.name
          : undefined
      "
    />

    <!-- Skeleton items while the list is loading -->
    <template v-if="busy">
      <b-repo-list-skeleton v-for="n in 5" :key="n" />
    </template>
  </ol>
</template>

<script>
import BRepoListItem from '@/blocks/BRepoListItem.vue'
import BRepoListSkeleton from '@/blocks/BRepoListSkeleton.vue'

export default {
  components: { BRepoListItem, BRepoListSkeleton },

  props: {
    repositories: {
      type: Array,
      default: () => []
    },
    busy: Boolean
  }
}
</script>
