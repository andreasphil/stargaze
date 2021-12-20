<template>
  <s-layout>
    <template #toolbar>
      <s-toolbar>
        <template #left>
          <div class="shrink-0 w-10 h-10 bg-gray-100 rounded-full"></div>
          <s-input block disabled class="ml-4" placeholder="Filter...">
            <template #icon>
              <search-circle-svg />
            </template>
          </s-input>
        </template>

        <template #right>
          <div></div>
        </template>
      </s-toolbar>
    </template>

    <s-repo-list :busy="true" />
  </s-layout>
</template>

<script>
import { defineComponent, onMounted, inject } from "vue"
import { useRouter } from "vue-router"
import SearchCircleSvg from "/@/assets/search-circle.svg"
import SInput from "/@/components/SInput.vue"
import SLayout from "/@/components/SLayout.vue"
import SRepoList from "/@/components/SRepoList.vue"
import SToolbar from "/@/components/SToolbar.vue"
import { login } from "/@/utils/api"

export default defineComponent({
  name: "AuthPage",

  components: { SRepoList, SInput, SToolbar, SLayout, SearchCircleSvg },

  setup() {
    const router = useRouter()
    const toast = inject("toast", () => undefined)
    const { code } = router.currentRoute.value.query

    onMounted(() => {
      // If there's no code, it's likely that the user ended up on this page by
      // mistake. Redirect back to home.
      if (!code) {
        router.replace({ name: "Home" })
      }

      // Grab and save the token
      login(code)
        .then(() => router.replace({ name: "Stars" }))
        .catch(() => {
          toast(
            "Something went wrong while signing you in. Please try again.",
            { type: "warning" }
          )

          router.replace({ name: "Home" })
        })
    })
  },
})
</script>
