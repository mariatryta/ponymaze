const state = () => ({
  pony: null,
  ponyName: null
});

// getters
const getters = {
  ponyName: (state) => {
    return state.ponyName;
  }
};

// actions
const actions = {
  // checkout({ commit, state }, products) {}
};

// mutations
const mutations = {
  setPony(state, data) {
    state.pony = data;
  },
  setPonyName(state, name) {
    state.ponyName = name;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
