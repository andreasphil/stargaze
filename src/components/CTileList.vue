<template>
  <ul
    v-if="repositories && repositories.length > 0"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    <c-tile-list-item
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
  </ul>
</template>

<script>
import CTileListItem from '@/components/CTileListItem.vue'

export default {
  components: { CTileListItem },

  props: {
    repositories: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
