<script setup>
import { useThemeColor } from "@andreasphil/design-system/scripts/utils";
import { onMounted } from "vue";
import { useStargazeStorage } from "./lib/data";
import SHome from "./pages/SHome.vue";
import SList from "./pages/SList.vue";

const { username, restoreSession } = useStargazeStorage();

onMounted(() => {
  useThemeColor();
  restoreSession();
});
</script>

<template>
  <!-- Page content -->
  <SHome v-if="!username" />
  <SList v-else />
</template>

<style scoped>
.footer {
  margin-top: var(--body-padding-y);
  text-align: center;
}
</style>
