import Vue from "vue";
import Vuex from "vuex";
import maze from "./maze";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    maze,
    user
  },
  actions: {
    resetGame({ commit }) {
      commit("user/resetData", null, { root: true });
      commit("maze/resetData", null, { root: true });
    }
  }
});
