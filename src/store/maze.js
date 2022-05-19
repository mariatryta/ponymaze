const state = () => ({
  data: [],
  id: null
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
  setId(state, id) {
    state.id = id;
  },
  setData(state, data) {
    state.data = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
