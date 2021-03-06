import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { InlineSvgPlugin } from "vue-inline-svg";
import Routes from "./utils/router";
import store from "./store";
import "./assets/tailwind.css";

import { FocusTrap } from "focus-trap-vue";

Vue.use(VueRouter);
Vue.use(InlineSvgPlugin);

Vue.component("FocusTrap", FocusTrap);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: Routes
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
