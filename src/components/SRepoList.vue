<template>
  <ol class="-mx-4">
    <s-repo-list-item
      v-for="repository in repositories"
      :key="repository.node.id"
      :name="repository.node.name"
      :url="repository.node.url"
      :author="repository.node.owner.login"
      :author-url="repository.node.owner.url"
      :icon="repository.node.owner.avatarUrl"
      :description="repository.node.description"
      :homepage="repository.node.homepageUrl"
      :homepage-title="shorten(repository.node.homepageUrl)"
    />

    <!-- Skeleton items while the list is loading -->
    <template v-if="busy">
      <s-repo-list-skeleton v-for="n in 3" :key="n" />
    </template>
  </ol>
</template>

<script>
import { defineComponent } from "vue"
import SRepoListItem from "/@/components/SRepoListItem.vue"
import SRepoListSkeleton from "/@/components/SRepoListSkeleton.vue"

export default defineComponent({
  components: { SRepoListItem, SRepoListSkeleton },

  props: {
    repositories: {
      type: Array,
      default: () => [],
    },
    busy: Boolean,
  },

  setup() {
    const shortHomepageUrls = {}

    const shorten = (input) => {
      if (!input) {
        return null
      }

      if (shortHomepageUrls[input]) {
        return shortHomepageUrls[input]
      }

      let output = input.replace(/^https?:\/\/(www.)?/, "")
      output = output.length > 30 ? `${output.substring(0, 30)}...` : output
      shortHomepageUrls[input] = output

      return output
    }

    return { shorten }
  },
})
</script>
