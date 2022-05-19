<template>
  <form class="input-wrapper" @submit.prevent="submit">
    <label :for="name"><slot></slot></label>
    <input
      type="text"
      :name="name"
      :id="name"
      v-model="value"
      :placeholder="placeholder"
    />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: "Input",
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

<style lang="scss" scoped>
</style>
