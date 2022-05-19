import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { InlineSvgPlugin } from "vue-inline-svg";
import Routes from "./utils/router";
import store from "./store";
import "./index.scss";

Vue.use(VueRouter);
Vue.use(InlineSvgPlugin);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: Routes
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
