import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { store } from "./services/store";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
  },
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);

app.mount("#app");
