<template>
  <SLayout class="flex items-center justify-center">
    <SEmptyState>
      <template #icon>
        <ExclamationSvg class="h-6" />
      </template>
      <template #message>
        This page doesn't exist.
        <SButton
          :to="{ name: 'Home' }"
          class="ml-2"
          inverted
          label="Back"
          tag="router-link"
        />
      </template>
    </SEmptyState>
  </SLayout>
</template>

<script lang="ts" setup>
import ExclamationSvg from "/@/assets/exclamation.svg?component";
import SButton from "/@/components/SButton.vue";
import SEmptyState from "/@/components/SEmptyState.vue";
import SLayout from "/@/components/SLayout.vue";
</script>
