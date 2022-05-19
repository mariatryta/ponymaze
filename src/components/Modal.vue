<template>
  <div
    role="dialog"
    :aria-labelledby="labeledBy"
    :aria-describedby="dialog - description"
    class="fixed top-0 left-0 bg h-screen w-screen flex justify-center items-center transition-all duration-200 ease-in"
  >
    <div
      class="absolute top-0 left-0 w-full h-full bg-white bg-opacity-70 z-1"
    ></div>
    <section class="relative shadow-2xl rounded-3xl z-2 bg-white max-w-xl">
      <div class="p-8 text-center sm:p-12">
        <slot name="main"></slot>
        <vButton @click="$emit('select')"> {{ selectButton }} </vButton>
        <vButton @click="$emit('close')"> {{ closeButton }} </vButton>
      </div>
    </section>
  </div>
</template>

<script>
import vButton from "./Button.vue";

export default {
  props: {
    labeledBy: {
      type: String,
      default: "",
      require: false,
    },
    describedby: {
      type: String,
      default: "",
      require: false,
    },
    selectButton: {
      type: String,
      default: "",
      require: true,
    },
    closeButton: {
      type: String,
      default: "",
      require: true,
    },
  },
  components: {
    vButton,
  },
  mounted() {},
};
</script>
