<script lang="ts" setup>
import ExclamationSvg from "/@/assets/exclamation.svg?component";
import SEmptyState from "/@/components/SEmptyState.vue";
import SLayout from "/@/components/SLayout.vue";
</script>

<template>
  <SLayout class="flex items-center justify-center">
    <SEmptyState>
      <template #icon>
        <ExclamationSvg class="h-6" />
      </template>
      <template #message>
        This page doesn't exist.
        <router-link :to="{ name: 'Home' }">Click here to go back.</router-link>
      </template>
    </SEmptyState>
  </SLayout>
</template>
