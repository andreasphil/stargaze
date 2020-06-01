<template>
  <router-link :to="to" class="px-1-1/2 py-1 inline-block">{{
    label
  }}</router-link>
</template>

<script>
export default {
  props: {
    to: {
      required: true,
      type: String
    },
    label: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped>
.router-link-exact-active {
  box-shadow: 0 0.125rem 0 0 var(--color-jet);
}
</style>
