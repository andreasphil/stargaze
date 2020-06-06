<template>
  <li>
    <a
      :href="url"
      class="
        block
        rounded
        h-full
        bg-white
        border
        border-transparent
        hover:border-yellow-400
        text-sm
        text-gray-700
        transition-colors
        duration-150
      "
    >
      <!-- Header -->
      <div class="flex items-center m-4">
        <div class="w-16 h-16 mr-4">
          <!-- Icon -->
          <img :src="icon" class="rounded w-full h-full bg-gray-100" />
        </div>

        <!-- Author and name -->
        <div class="flex-grow">
          <a v-if="author" :href="authorUrl" class="block truncate">
            @{{ author }}
          </a>

          <!-- Name -->
          <h2 class="text-base text-gray-800 font-semibold truncate">
            {{ name }}
          </h2>
        </div>
      </div>

      <!-- Content -->
      <div class="mx-4 my-6 h-16 overflow-hidden" v-html="description"></div>

      <!-- Footer -->
      <div class="m-4 space-x-2">
        <span
          v-if="language"
          class="inline-block text-small px-3 py-1 bg-gray-200 rounded-full"
        >
          {{ language }}
        </span>

        <span
          v-if="homepage"
          class="inline-block text-small px-3 py-1 bg-yellow-200 text-yellow-700 rounded-full"
        >
          <a :href="homepage">Website</a>
        </span>
      </div>
    </a>
  </li>
</template>

<script>
export default {
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
