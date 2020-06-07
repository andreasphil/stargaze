<template>
  <li>
    <a
      :href="url"
      :title="`Visit ${name} on GitHub`"
      class="
        block
        h-full
        bg-white
        rounded-lg
        border
        border-transparent
        text-sm
        text-gray-600
        shadow-sm
        hover:shadow-outline-yellow
        transition-shadow
        duration-150
      "
    >
      <!-- Header -->
      <div class="flex items-center m-4">
        <!-- Icon -->
        <div class="w-16 h-16 mr-4">
          <img :src="icon" class="rounded-lg w-full h-full bg-gray-100" />
        </div>

        <!-- Author and name -->
        <div class="flex-grow">
          <a
            v-if="author"
            :href="authorUrl"
            :title="`Visit ${author} on GitHub`"
            class="block truncate"
          >
            @{{ author }}
          </a>

          <h2 class="text-base text-gray-800 font-semibold truncate">
            {{ name }}
          </h2>
        </div>
      </div>

      <!-- Content -->
      <div class="mx-4 my-6 h-16 overflow-hidden" v-html="description"></div>

      <!-- Footer -->
      <div class="m-4 space-x-2">
        <c-tag v-if="language" :label="language" />
        <c-tag
          v-if="homepage"
          label="Website"
          :href="homepage"
          :title="`Visit ${name}'s website`"
        />
      </div>
    </a>
  </li>
</template>

<script>
import CTag from '@/components/CTag.vue'

export default {
  components: { CTag },

  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    author: String,
    authorUrl: String,
    homepage: String,
    language: String
  }
}
</script>
