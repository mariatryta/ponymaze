import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Home from "../../src/views/Home.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user: {
      namespaced: true,
      state: {
        pony: {
          name: "Princess Luna",
          image: ""
        }
      }
    }
  }
});

describe("Mounted App with state 0", () => {
  const wrapper = shallowMount(Home, {
    store,
    localVue,
    data() {
      return {
        state: 0
      };
    }
  });

  test("does a wrapper exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("expect to find select pony component", () => {
    expect(wrapper.find("#select-pony").exists()).toBe(true);
  });
});

describe("Test State 1 view", () => {
  const wrapper = shallowMount(Home, {
    store,
    localVue,
    data() {
      return {
        state: 1
      };
    }
  });

  test("expect to find select pony component", () => {
    expect(wrapper.find("#select-maze").exists()).toBe(true);
  });
});
