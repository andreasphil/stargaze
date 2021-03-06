<template>
  <li>
    <a
      :href="url"
      :title="`Visit ${name} on GitHub`"
      class="block h-full bg-white rounded-lg overflow-hidden border-2 border-transparent text-sm text-gray-600 no-underline hover:text-gray-600 hover:border-primary-400 transition-border duration-150"
    >
      <!-- Header -->
      <div class="flex items-center m-4 space-x-4">
        <!-- Icon -->
        <div class="w-16 h-16">
          <img
            :src="icon"
            :alt="author ? `GitHub avatar of ${author}` : ''"
            loading="lazy"
            width="64px"
            height="64px"
            class="rounded w-full h-full bg-gray-100"
          />
        </div>

        <!-- Author and name -->
        <div class="flex-grow title-width">
          <a
            v-if="author"
            :href="authorUrl"
            :title="`Visit ${author} on GitHub`"
            class="block truncate no-underline"
            >@{{ author }}</a
          >

          <h2 class="text-base text-gray-800 font-semibold truncate">
            {{ name }}
          </h2>
        </div>
      </div>

      <!-- Content -->
      <div class="m-4 mt-6 h-16 overflow-hidden" v-html="description"></div>

      <!-- Footer -->
      <div
        v-if="language || homepage"
        class="border-t border-gray-100 divide-x divide-gray-100"
      >
        <span v-if="language" class="p-4 inline-block">{{ language }}</span>
        <span v-if="homepage" class="p-4 inline-block space-x-1">
          <external-link-svg class="h-text-4 inline" />
          <a :href="homepage" :title="`Visit ${name}'s website`">Website</a>
        </span>
      </div>
    </a>
  </li>
</template>

<script>
import ExternalLinkSvg from "/@/assets/external-link.svg"

export default {
  components: {
    ExternalLinkSvg,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: null,
    },
    authorUrl: {
      type: String,
      default: null,
    },
    homepage: {
      type: String,
      default: null,
    },
    language: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped>
.title-width {
  max-width: calc(100% - 5rem);
}
</style>
