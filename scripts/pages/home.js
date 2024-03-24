import { useStargazeStorage } from "@/data.js";
import { defineComponent, ref } from "vue";

export const Home = defineComponent({
  setup() {
    const { username } = useStargazeStorage();
    const usernameModel = ref("");

    function browseStars() {
      username.value = usernameModel.value;
    }

    return { browseStars, usernameModel };
  },

  template: `
    <main class="home" data-container>
      <img class="logo" src="./assets/icon-192.png" width="72" height="72" />
      <hgroup>
        <h1>Stargaze</h1>
        <p>
          A faster way of browsing and searching your starred repositories on
          GitHub.
        </p>
      </hgroup>

      <form class="usernameForm" @submit.prevent="browseStars()">
        <label for="ghUsername" data-hidden>Your GitHub username</label>
        <input
          autofocus
          id="ghUsername"
          placeholder="Your GitHub username"
          type="text"
          v-model="usernameModel"
        />
        <button class="usernameSubmit" data-variant="outline" type="submit">
          🐱 Browse stars
        </button>
      </form>

      <div class="callout">
        <div class="calloutIcon">💡</div>
        <p class="calloutText">
          This uses GitHub&rsquo;s public API and doesn&rsquo;t require you to sign
          in. Because we rely on public information, Stargaze won&rsquo;t work with
          private profiles.
        </p>
      </div>
    </main>
  `,
});
