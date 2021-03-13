<template>
  <li
    class="relative flex items-center px-4 h-24 hover:bg-gray-100 normal:rounded-lg space-x-3"
  >
    <!-- Icon -->
    <s-image-icon
      class="flex-none"
      width="w-14"
      height="h-14"
      :src="icon"
      :alt="author ? `GitHub avatar of ${author}` : ''"
    />

    <div class="title-width flex-1">
      <!-- Author and name -->
      <h2 class="space-x-1 truncate">
        <a
          :href="authorUrl"
          :title="`Visit ${author}'s profile on GitHub`"
          class="font-medium"
          tabindex="-1"
          >{{ author }}</a
        ><span class="text-gray-300">/</span
        ><a
          :href="url"
          :title="`Visit ${name} on GitHub`"
          class="absolute-link text-gray-900 font-bold"
          >{{ name }}</a
        >
      </h2>

      <!-- Description and website -->
      <p
        v-if="description || homepage"
        class="h-text-5 text-sm leading-5 truncate"
      >
        <a v-if="homepage" :href="homepage" tabindex="-1">{{
          homepageTitle || homepage
        }}</a>
        <template v-if="description && homepage"> – </template>
        <span class="text-gray-500">{{ description }}</span>
      </p>
    </div>
  </li>
</template>

<script>
import SImageIcon from "/@/components/SImageIcon.vue"

export default {
  components: {
    SImageIcon,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
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
    homepageTitle: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="postcss" scoped>
li,
li * {
  @apply transition-all duration-100;
}

a {
  @apply relative z-10 no-underline;
}

a:hover {
  @apply underline;
}

.title-width {
  max-width: calc(100% - 6.5rem);
}

.absolute-link {
  @apply static z-auto outline-none;
}

.absolute-link::after {
  @apply border-2 absolute inset-0 border-transparent rounded-lg;
  content: "";
}

.absolute-link:focus::after {
  @apply border-primary-500;
}
</style>
