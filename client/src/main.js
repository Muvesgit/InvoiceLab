import { createApp } from "vue";
import App from "./App";

import router from "./router"
import PrimeVue from 'primevue/config';
import "./assets/style.css"
import "primevue/resources/themes/lara-light-teal/theme.css"

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.mount("#app");