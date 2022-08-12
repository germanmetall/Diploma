import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import platformAPI from "./mixins/api.js";
import landingAPI from "./mixins/api1.js";

let app = createApp(App).use(router).mixin(platformAPI).mixin(landingAPI);

app.config.compilerOptions.isCustomElement = tag => tag.startsWith('lp-')

app.mount('#app')
