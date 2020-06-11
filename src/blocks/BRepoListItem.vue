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
        overflow-hidden
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
      <div class="flex items-center m-4 space-x-4">
        <!-- Icon -->
        <div class="w-16 h-16">
          <img
            :src="icon"
            loading="lazy"
            width="64px"
            height="64px"
            class="rounded-lg w-full h-full bg-gray-100"
          />
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
      <div class="m-4 mt-6 h-16 overflow-hidden" v-html="description"></div>

      <!-- Footer -->
      <div class="border-t border-gray-100 divide-x divide-gray-100">
        <span v-if="language" class="p-4 inline-block">
          {{ language }}
        </span>
        <span v-if="homepage" class="p-4 inline-block">
          <a
            class="underline hover:text-gray-900 transition-colors duration-150"
            :href="homepage"
            :title="`Visit ${name}'s website`"
          >
            Website
          </a>
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
