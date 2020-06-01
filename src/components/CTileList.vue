<template>
  <ul
    v-if="repositories && repositories.length > 0"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1-1/2"
  >
    <c-tile-list-item
      v-for="repository in repositories"
      :key="repository.id"
      :name="repository.name"
      :url="repository.url"
      :author="repository.owner.login"
      :authorUrl="repository.owner.url"
      :icon="repository.owner.avatarUrl"
      :description="repository.descriptionHTML"
      :homepage="repository.homepageUrl"
      :language="
        repository.primaryLanguage ? repository.primaryLanguage.name : undefined
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
