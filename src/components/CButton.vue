<template>
  <button class="rounded px-1 py-3/4 hover:bg-cultured" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
