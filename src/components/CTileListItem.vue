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
        hover:border-crayola
        shadow-sm
        text-small
        text-web
        transition-colors
        duration-150
      "
    >
      <!-- Header -->
      <div class="flex items-center m-1">
        <div class="w-4 h-4 mr-1">
          <!-- Icon -->
          <img :src="icon" class="rounded w-full h-full bg-cultured" />
        </div>

        <!-- Author and name -->
        <div class="flex-grow">
          <a v-if="author" :href="authorUrl" class="block truncate">
            @{{ author }}
          </a>

          <!-- Name -->
          <h2 class="text-base text-jet font-emphasized truncate">
            {{ name }}
          </h2>
        </div>
      </div>

      <!-- Content -->
      <div class="mx-1 my-1-1/2 h-4 overflow-hidden" v-html="description"></div>

      <!-- Footer -->
      <div class="m-1 space-x-1/2">
        <span
          v-if="language"
          class="inline-block text-small px-1/2 py-1/4 bg-cultured rounded"
        >
          {{ language }}
        </span>

        <span
          v-if="homepage"
          class="inline-block text-small px-1/2 py-1/4 bg-crayola-10 text-crayola rounded"
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
