const state = () => ({
  pony: null
});

// getters
const getters = {
  // cartTotalPrice: (state, getters) => {}
};

// actions
const actions = {
  // checkout({ commit, state }, products) {}
};

// mutations
const mutations = {
  setPony(state, data) {
    state.pony = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
