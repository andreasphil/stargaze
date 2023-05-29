<script setup>
import { ref } from "vue";
import { useStargazeStorage } from "../lib/data";

const { username } = useStargazeStorage();
const usernameModel = ref("");

function browseStars() {
  username.value = usernameModel.value;
}
</script>

<template>
  <main :class="[$style.home]" data-container>
    <img
      :class="[$style.logo]"
      src="/icon-192.png"
      width="72"
      height="72"
    />
    <hgroup>
      <h1>Stargaze</h1>
      <p>
        A faster way of browsing and searching your starred repositories on
        GitHub.
      </p>
    </hgroup>

    <form :class="[$style.usernameForm]" @submit.prevent="browseStars()">
      <label for="ghUsername" data-hidden>Your GitHub username</label>
      <input
        autofocus
        id="ghUsername"
        placeholder="Your GitHub username"
        type="text"
        v-model="usernameModel"
      />
      <button
        :class="[$style.usernameSubmit]"
        data-variant="outline"
        type="submit"
      >
        🐱 Browse stars
      </button>
    </form>

    <div :class="[$style.callout]">
      <div :class="[$style.calloutIcon]">💡</div>
      <p :class="[$style.calloutText]">
        This uses GitHub&rsquo;s public API and doesn&rsquo;t require you to
        sign in. Because we rely on public information, Stargaze won&rsquo;t
        work with private profiles.
      </p>
    </div>
  </main>
</template>

<style module>
.home {
  text-align: center;
}

.logo {
  margin: 0 auto;
}

.usernameForm {
  display: flex;
  gap: 0.75rem;
  margin: var(--body-padding-y) auto 1.5rem;
  max-width: 26rem;
}

.usernameSubmit {
  flex: 0 0 auto;
}

.callout {
  background: var(--c-surface-bg);
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-elevation-low);
  display: flex;
  gap: 0.75rem;
  margin: 1.5rem auto 0;
  max-width: 26rem;
  padding: 0.625rem 1rem;
  text-align: left;
}

.calloutText {
  color: var(--c-fg-variant);
  font-size: var(--font-size-small);
  margin: 0.15rem 0;
}
</style>
