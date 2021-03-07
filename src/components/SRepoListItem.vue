<template>
  <li
    class="flex items-center px-4 h-24 space-x-3 normal:rounded-lg normal:border border-transparent hover:bg-gray-100 focus:border-primary-500 cursor-pointer outline-none"
    tabindex="0"
    @keyup.enter.stop="go"
    @click.stop="go"
  >
    <!-- Icon -->
    <s-blur-icon
      class="flex-none"
      width="w-14"
      height="h-14"
      rounded="rounded-full"
      :src="icon"
      :alt="author ? `GitHub avatar of ${author}` : ''"
    />

    <div class="title-width flex-1">
      <!-- Author and name -->
      <h2 class="truncate space-x-1">
        <a
          :href="authorUrl"
          :title="`Visit ${author}'s profile on GitHub`"
          class="font-medium"
          tabindex="-1"
          @click.stop
          >{{ author }}</a
        ><span class="text-gray-300">/</span
        ><a
          :href="url"
          :title="`Visit ${name} on GitHub`"
          class="font-bold text-gray-900"
          tabindex="-1"
          @click.stop
          >{{ name }}</a
        >
      </h2>

      <!-- Description and website -->
      <p
        v-if="description || homepage"
        class="text-sm h-text-5 leading-5 truncate"
      >
        <a v-if="homepage" :href="homepage" tabindex="-1" @click.stop>{{
          shorten(homepage)
        }}</a>
        <template v-if="description && homepage"> – </template>
        <span class="text-gray-500">{{ description }}</span>
      </p>
    </div>
  </li>
</template>

<script>
import SBlurIcon from "/@/components/SBlurIcon.vue"

export default {
  components: {
    SBlurIcon,
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
  },

  methods: {
    shorten(input) {
      const output = input.replace(/^https?:\/\/(www.)?/, "")
      return output.length > 30 ? `${output.substring(0, 30)}...` : output
    },

    go(event) {
      const url = event.shiftKey && this.homepage ? this.homepage : this.url
      window.open(url, "_self")
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
  @apply no-underline;
}

a:hover {
  @apply underline;
}

.title-width {
  max-width: calc(100% - 6.5rem);
}
</style>
