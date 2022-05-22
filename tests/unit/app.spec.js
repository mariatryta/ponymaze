import { shallowMount } from "@vue/test-utils";
import App from "../../src/App.vue";

describe("Mounted App", () => {
  const wrapper = shallowMount(App, {
    stubs: ["router-view"]
  });

  test("does a wrapper exist", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
