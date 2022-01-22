<template>
  <SLayout>
    <template #toolbar>
      <SToolbar>
        <template #left>
          <div class="shrink-0 w-10 h-10 bg-gray-100 rounded-full"></div>
          <SInput block disabled class="ml-3 w-full" placeholder="Filter...">
            <template #icon>
              <SearchCircleSvg />
            </template>
          </SInput>
        </template>

        <template #right>
          <div></div>
        </template>
      </SToolbar>
    </template>

    <div class="mb-4 h-6 bg-gray-100 rounded w-1/4"></div>

    <SRepoList :busy="true" />
  </SLayout>
</template>

<script lang="ts" setup>
import { inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import SearchCircleSvg from "/@/assets/search-circle.svg?component";
import SInput from "/@/components/SInput.vue";
import SLayout from "/@/components/SLayout.vue";
import SRepoList from "/@/components/SRepoList.vue";
import SToolbar from "/@/components/SToolbar.vue";
import { login } from "/@/utils/api";
import { ToasterProvider } from "/@/utils/types";

const router = useRouter();
const toast = inject(ToasterProvider, () => undefined);
const { code } = router.currentRoute.value.query;

onMounted(() => {
  // If there's no code, it's likely that the user ended up on this page by
  // mistake. Redirect back to home.
  if (!code) {
    router.replace({ name: "Home" });
    return;
  }

  // Grab and save the token
  login(code.toString())
    .then(() => router.replace({ name: "Stars" }))
    .catch(() => {
      toast("Something went wrong while signing you in. Please try again.", {
        type: "warning",
      });

      router.replace({ name: "Home" });
    });
});
</script>
