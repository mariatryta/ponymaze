<template>
  <div
    class="grid grid-cols-3 grid-rows-2 bg-white shadow w-24 h-24 rounded-full items-center"
  >
    <span
      class="transform rotate-90 row-span-2 flex justify-center"
      @click="makeMove('west')"
      ><ArrowDown></ArrowDown
    ></span>
    <span
      class="transform rotate-180 flex justify-center"
      @click="makeMove('north')"
      ><ArrowDown></ArrowDown
    ></span>
    <span
      class="transform rotate-270 row-span-2 flex justify-center"
      @click="makeMove('east')"
      ><ArrowDown></ArrowDown
    ></span>
    <span
      class="transform row-span-2 flex justify-center"
      @click="makeMove('south')"
      ><ArrowDown></ArrowDown
    ></span>
  </div>
</template>

<script>
import ArrowDown from "@/assets/icons/arrow-down.svg";

export default {
  components: {
    ArrowDown,
  },
  methods: {
    makeMove(direction) {
      this.$emit("makeMove", direction);
    },
  },
};
</script>
