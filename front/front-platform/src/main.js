import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import API from "./mixins/api.js";

let app = createApp(App).use(router).mixin(API);

app.mount('#app')
