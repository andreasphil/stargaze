<template>
  <span
    class="
      inline-block
      rounded-full
      px-3
      py-2
      text-sm
      leading-none
      text-gray-700
      bg-gray-200
    "
    :class="{ link: !!href }"
  >
    <template v-if="href">
      <a :href="href" :title="title">{{ label }}</a>
    </template>

    <template v-else>
      {{ label }}
    </template>
  </span>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    href: String,
    title: String
  }
}
</script>

<style lang="postcss" scoped>
.link {
  @apply bg-yellow bg-opacity-50 text-opacity-75;
}
</style>
