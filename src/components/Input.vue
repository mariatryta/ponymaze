<template>
  <form class="md:w-6/12 w-4/5" @submit.prevent="submit">
    <div class="relative">
      <label class="block text-s font-medium text-gray-500" :key="name">
        <slot></slot>
      </label>

      <input
        class="w-full p-3 mt-1 text-sm border-2 border-gray-200 rounded focus:border-pink-600 focus:ring-0"
        type="text"
        :name="name"
        :id="name"
        v-model="value"
        :placeholder="placeholder"
      />
    </div>
    <vButton type="submit">Submit</vButton>
  </form>
</template>

<script>
import vButton from "./Button.vue";

export default {
  name: "Input",
  components: {
    vButton,
  },
  props: {
    name: {
      type: String,
      require: true,
    },
    placeholder: {
      type: String,
      require: false,
      default: "",
    },
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.value);
    },
  },
};
</script>

