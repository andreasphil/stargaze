import { createProvider } from './vue-apollo'
import App from './App.vue'
import router from './router'
import Vue from 'vue'

Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
