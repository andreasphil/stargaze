<template>
  <s-layout class="flex items-center justify-center">
    <s-empty-state>
      <template #icon>
        <exclamation-svg class="h-6" />
      </template>
      <template #message>
        This page doesn't exist.
        <s-button
          :to="{ name: 'Home' }"
          class="ml-2"
          inverted
          label="Back"
          tag="router-link"
        />
      </template>
    </s-empty-state>
  </s-layout>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"
import ExclamationSvg from "/@/assets/exclamation.svg"
import SButton from "/@/components/SButton.vue"
import SEmptyState from "/@/components/SEmptyState.vue"
import SLayout from "/@/components/SLayout.vue"

export default defineComponent({
  name: "ErrorPage",

  components: { SEmptyState, ExclamationSvg, SLayout, SButton },
})
</script>
