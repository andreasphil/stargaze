<script setup>
import { useThemeColor } from "finecss";
import { onMounted } from "vue";
import { META } from "./lib/config";
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

  <footer data-container className="footer">
    <small>
      A thing made by <a :href="META.authorWebsite">{{ META.authorName }}</a
      >. 🐱 <a :href="META.repository">View source</a>.
    </small>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: var(--body-padding-y);
  text-align: center;
}
</style>
