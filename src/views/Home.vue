<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import GithubSvg from "/@/assets/github.svg?component";
import SButton from "/@/components/SButton.vue";
import SLayout from "/@/components/SLayout.vue";
import { getSignInUrl, getState, login } from "/@/utils/api";
import { ToasterProvider } from "/@/utils/types";

const signInUrl = getSignInUrl({
  state: getState(),
  clientId: import.meta.env.VITE_APP_AUTH_CLIENT_ID?.toString() ?? "",
  redirectTo: `${window.location.origin}`,
});

/* -------------------------------------------------- *
 * When the page is opened after signing in with      *
 * GitHub                                             *
 * -------------------------------------------------- */

const router = useRouter();
const toast = inject(ToasterProvider, () => undefined);
const { code } = router.currentRoute.value.query;
const isLoading = ref(false);

onMounted(() => {
  if (!code) return;

  isLoading.value = true;

  // Grab and save the token
  login(code.toString())
    .then(() => router.replace({ name: "Stars" }))
    .catch(() => {
      toast("Something went wrong while signing you in. Please try again.", {
        type: "warning",
      });
    })
    .finally(() => (isLoading.value = false));
});
</script>

<template>
  <SLayout class="flex flex-col items-center justify-center text-center">
    <h1 class="font-bold text-$c-primary uppercase my-0">
      <small class="block">Stargaze</small>
    </h1>
    <h2 class="mt-4 mb-16 text-size-$font-size-h1 max-w-[36rem]">
      A faster way of browsing and searching your starred repositories on GitHub
    </h2>
    <SButton
      :aria-busy="isLoading"
      :class="{ 'pointer-events-none': isLoading }"
      :href="signInUrl"
      label="Sign in with GitHub"
      large
      tag="a"
    >
      <GithubSvg v-if="!isLoading" />
    </SButton>
  </SLayout>
</template>
