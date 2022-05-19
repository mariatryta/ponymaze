<template>
  <form class="input__wrapper" @submit.prevent="submit">
    <label class="input__label" :for="name"><slot></slot></label>
    <input
      class="input__input"
      type="text"
      :name="name"
      :id="name"
      v-model="value"
      :placeholder="placeholder"
    />
    <button class="input__button" type="submit">Submit</button>
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
.input__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .input__ {
    &label {
      margin-bottom: 16px;
      font-size: 24px;
    }

    &input {
      background-color: transparent;
      border: 1px solid $light;
      border-radius: 0;
      outline: none;
      height: 3rem;
      width: 100%;
      font-size: 1rem;
      margin: 0 0 15px 0;
      padding: 0;
      box-shadow: none;
    }
  }
}
</style>
