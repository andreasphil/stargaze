import { useStargazeStorage } from "@/data.js";
import { Home } from "@/pages/home.js";
import { List } from "@/pages/list.js";
import { useThemeColor } from "@andreasphil/design-system";
import { createApp, defineComponent, onMounted } from "vue";

const App = defineComponent({
  setup() {
    const { username, restoreSession } = useStargazeStorage();

    onMounted(() => {
      useThemeColor();
      restoreSession();
    });

    return { username };
  },

  components: { Home, List },

  template: `
    <!-- Page content -->
    <Home v-if="!username" />
    <List v-else />
  `,
});

createApp(App).mount("#app");
