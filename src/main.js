import { createApp } from "vue"
import App from "./App.vue"
import router from "/@/router"
import VueToaster from "/@/plugins/VueToaster"

createApp(App).use(router).use(VueToaster).mount("#app")
