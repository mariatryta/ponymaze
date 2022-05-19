import Vue from "vue";
import Vuex from "vuex";
import maze from "./maze";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    maze,
    user
  }
});
